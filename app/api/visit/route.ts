import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite-server";
import { ID, Query } from "node-appwrite";
import { WEB_PROJECTS, AUTOMATION_WORKFLOWS } from "@/data/portfolioData";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ANALYTICS_ID;

// Only real pages are counted, so the collection can't be filled with junk paths.
const TRACKED_PATHS = new Set([
  "/",
  ...WEB_PROJECTS.map((project) => `/projects/${project.id}`),
  ...AUTOMATION_WORKFLOWS.map((automation) => `/automations/${automation.id}`),
]);

// One counted view per visitor per page every 30 minutes.
const VIEW_WINDOW_MS = 30 * 60 * 1000;

export async function POST(request: Request) {
  if (!DATABASE_ID || !COLLECTION_ID) {
    return new NextResponse("Analytics not configured", { status: 500 });
  }

  let path: string | null = null;
  try {
    const body = await request.json();
    if (typeof body?.path === "string") {
      path = body.path.replace(/\/+$/, "") || "/";
    }
  } catch {
    // ignore malformed bodies
  }

  if (!path || !TRACKED_PATHS.has(path)) {
    return new NextResponse(null, { status: 204 });
  }

  const ip = clientIp(request.headers);
  if (
    isRateLimited(`visit:${ip}`, 30, 60 * 1000) ||
    isRateLimited(`visit:${ip}:${path}`, 1, VIEW_WINDOW_MS)
  ) {
    return new NextResponse(null, { status: 204 });
  }

  const db = adminDatabases();

  try {
    const existing = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("path", path),
      Query.limit(1),
    ]);

    if (existing.documents.length > 0) {
      await db.incrementDocumentAttribute(
        DATABASE_ID,
        COLLECTION_ID,
        existing.documents[0].$id,
        "count",
        1
      );
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
