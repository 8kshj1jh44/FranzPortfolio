import { createHash, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { adminDatabases } from "@/lib/appwrite-server";
import { Query } from "node-appwrite";
import { clientIp, isRateLimited } from "@/lib/rate-limit";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_COLLECTION_ANALYTICS_ID;
const ANALYTICS_PASSWORD = process.env.ANALYTICS_PASSWORD;

function passwordMatches(candidate: string | null): boolean {
  if (!ANALYTICS_PASSWORD || !candidate) return false;
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(ANALYTICS_PASSWORD).digest();
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const ip = clientIp(request.headers);
  if (isRateLimited(`analytics:${ip}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  if (!passwordMatches(request.headers.get("x-analytics-password"))) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
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

    return NextResponse.json(
      { total, totalVisits, breakdown },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to read analytics:", error);
    return NextResponse.json({ error: "Failed to read analytics" }, { status: 500 });
  }
}
