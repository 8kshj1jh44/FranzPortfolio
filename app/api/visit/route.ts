import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite-server";
import { ID, Query } from "node-appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ANALYTICS_ID;

export async function POST(request: Request) {
  if (!DATABASE_ID || !COLLECTION_ID) {
    return new NextResponse("Analytics not configured", { status: 500 });
  }

  let path = "/";
  try {
    const body = await request.json();
    if (typeof body?.path === "string" && body.path.startsWith("/")) {
      path = body.path;
    }
  } catch {
    // fall back to root path
  }

  const db = adminDatabases();

  try {
    const existing = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("path", path),
      Query.limit(1),
    ]);

    if (existing.documents.length > 0) {
      const doc = existing.documents[0];
      await db.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: (Number(doc.count) || 0) + 1,
      });
    } else {
      await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        path,
        count: 1,
      });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to record visit:", error);
    return new NextResponse("Failed to record visit", { status: 500 });
  }
}
