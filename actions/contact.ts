"use server";

import { AppwriteException, ID } from "node-appwrite";
import { z } from "zod";
import { adminDatabases } from "@/lib/appwrite-server";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  projectType: z.string().trim().min(1, "Please choose a project type.").max(100),
  message: z.string().trim().min(1, "Please include a message.").max(2000),
});

export interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Please check your details.",
    };
  }

  const data = parsed.data;
  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_COLLECTION_MESSAGES_ID;
  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;

  if (!databaseId || !collectionId) {
    return { success: false, message: "The contact form is not configured yet." };
  }

  let documentId: string;
  try {
    const document = await adminDatabases().createDocument(
      databaseId,
      collectionId,
      ID.unique(),
      {
        name: data.name,
        email: data.email,
        projectType: data.projectType,
        message: data.message,
        status: "unread",
      }
    );
    documentId = document.$id;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite error persisting contact message:", error.message);
    } else {
      console.error("Failed to persist contact message:", error);
    }
    return { success: false, message: "Could not save your message. Please try again." };
  }

  if (webhookUrl) {
    void forwardToN8n(webhookUrl, data, documentId);
  }

  return {
    success: true,
    message: "Message sent. I'll get back to you shortly.",
  };
}

async function forwardToN8n(
  webhookUrl: string,
  data: {
    name: string;
    email: string;
    projectType: string;
    message: string;
  },
  documentId: string
): Promise<void> {
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "contact.message.created",
        documentId,
        contact: {
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          message: data.message,
        },
      }),
    });
  } catch (error) {
    console.error("Failed to forward contact message to n8n:", error);
  }
}