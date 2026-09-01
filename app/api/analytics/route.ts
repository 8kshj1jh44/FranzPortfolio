import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite-server";
import { Query } from "node-appwrite";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ANALYTICS_ID;
const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get("password");

  if (!ANALYTICS_PASSWORD || password !== ANALYTICS_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!DATABASE_ID || !COLLECTION_ID) {
    return NextResponse.json({ error: "Analytics not configured" }, { status: 500 });
  }

  try {
    const db = adminDatabases();
    const { documents, total } = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(100),
    ]);

    const totalVisits = documents.reduce(
      (sum, doc) => sum + (Number(doc.count) || 0),
      0
    );

    const breakdown = documents
      .filter((doc) => typeof doc.path === "string" && doc.path)
      .map((doc) => ({ path: doc.path, count: Number(doc.count) || 0 }));

    return NextResponse.json({ total, totalVisits, breakdown });
  } catch (error) {
    console.error("Failed to read analytics:", error);
    return NextResponse.json({ error: "Failed to read analytics" }, { status: 500 });
  }
}
