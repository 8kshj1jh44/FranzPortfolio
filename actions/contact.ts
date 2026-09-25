"use server";

import { headers } from "next/headers";
import { AppwriteException, ID } from "node-appwrite";
import { z } from "zod";
import { adminDatabases } from "@/lib/appwrite-server";
import { PROJECT_TYPES } from "@/data/portfolioData";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address."),
  projectType: z.enum(PROJECT_TYPES, "Please choose a project type."),
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
  const website = formData.get("website");
  if (typeof website === "string" && website.trim() !== "") {
    return {
      success: true,
      message: "Message sent. I'll get back to you shortly.",
    };
  }

  if (isRateLimited(`contact:${clientIp(headers())}`, 3, 10 * 60 * 1000)) {
    return {
      success: false,
      message: "Too many messages. Please wait a few minutes or email me directly.",
    };
  }

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

  if (!databaseId || !collectionId) {
    return { success: false, message: "The contact form is not configured yet." };
  }

  try {
    await adminDatabases().createDocument(
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
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite error persisting contact message:", error.message);
    } else {
      console.error("Failed to persist contact message:", error);
    }
    return { success: false, message: "Could not save your message. Please try again." };
  }

  return {
    success: true,
    message: "Message sent. I'll get back to you shortly.",
  };
}