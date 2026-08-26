import "dotenv/config";
import { AppwriteException, Databases, Storage } from "node-appwrite";
import { createAdminClient } from "../lib/appwrite-server";

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID ?? "portfolio_db";
const PROJECTS_COL = process.env.APPWRITE_COLLECTION_PROJECTS_ID ?? "projects";
const AUTOMATIONS_COL =
  process.env.APPWRITE_COLLECTION_AUTOMATIONS_ID ?? "automations";
const MESSAGES_COL =
  process.env.APPWRITE_COLLECTION_MESSAGES_ID ?? "contact_messages";
const BUCKET_ID = process.env.APPWRITE_STORAGE_BUCKET_ID ?? "portfolio_assets";

const READ_WRITE = ["read(\"any\")", "create(\"any\")", "update(\"any\")", "delete(\"any\")"];
const CREATE_ONLY = ["create(\"any\")"];

function isAlreadyExists(error: unknown): boolean {
  if (error instanceof AppwriteException) {
    const message = error.message.toLowerCase();
    return (
      message.includes("already exists") ||
      message.includes("already in use") ||
      message.includes("already_created") ||
      message.includes("resource already exists")
    );
  }
  return false;
}

async function safe(label: string, fn: () => Promise<unknown>): Promise<void> {
  try {
    await fn();
    console.log(`  ✓ ${label}`);
  } catch (error) {
    if (isAlreadyExists(error)) {
      console.log(`  • ${label} (already exists)`);
    } else {
      console.error(`  ✗ ${label}`);
      throw error;
    }
  }
}

async function ensureDatabase(db: Databases): Promise<void> {
  await safe(`Create database "${DATABASE_ID}"`, () =>
    db.create(DATABASE_ID, "Portfolio")
  );
}

async function ensureCollections(db: Databases): Promise<void> {
  await safe(`Create collection "${PROJECTS_COL}"`, () =>
    db.createCollection(
      DATABASE_ID,
      PROJECTS_COL,
      "Projects",
      READ_WRITE,
      false,
      true
    )
  );
  await safe(`Create collection "${AUTOMATIONS_COL}"`, () =>
    db.createCollection(
      DATABASE_ID,
      AUTOMATIONS_COL,
      "Automations",
      READ_WRITE,
      false,
      true
    )
  );
  await safe(`Create collection "${MESSAGES_COL}"`, () =>
    db.createCollection(
      DATABASE_ID,
      MESSAGES_COL,
      "Contact Messages",
      CREATE_ONLY,
      false,
      true
    )
  );
}

async function ensureProjectsAttributes(db: Databases): Promise<void> {
  await safe(`String attr "title" (projects)`, () =>
    db.createStringAttribute(DATABASE_ID, PROJECTS_COL, "title", 255, true)
  );
  await safe(`String attr "description" (projects)`, () =>
    db.createStringAttribute(DATABASE_ID, PROJECTS_COL, "description", 1000, true)
  );
  await safe(`URL attr "liveUrl" (projects)`, () =>
    db.createUrlAttribute(DATABASE_ID, PROJECTS_COL, "liveUrl", true)
  );
  await safe(`URL attr "githubUrl" (projects)`, () =>
    db.createUrlAttribute(DATABASE_ID, PROJECTS_COL, "githubUrl", false)
  );
  await safe(`String[] attr "techStack" (projects)`, () =>
    db.createStringAttribute(DATABASE_ID, PROJECTS_COL, "techStack", 255, true, undefined, true)
  );
  await safe(`String[] attr "highlights" (projects)`, () =>
    db.createStringAttribute(DATABASE_ID, PROJECTS_COL, "highlights", 1000, true, undefined, true)
  );
  await safe(`String attr "imageId" (projects)`, () =>
    db.createStringAttribute(DATABASE_ID, PROJECTS_COL, "imageId", 255, false)
  );
  await safe(`Integer attr "order" (projects)`, () =>
    db.createIntegerAttribute(DATABASE_ID, PROJECTS_COL, "order", false, undefined, undefined, 0)
  );
}

async function ensureAutomationsAttributes(db: Databases): Promise<void> {
  await safe(`String attr "title" (automations)`, () =>
    db.createStringAttribute(DATABASE_ID, AUTOMATIONS_COL, "title", 255, true)
  );
  await safe(`String attr "description" (automations)`, () =>
    db.createStringAttribute(DATABASE_ID, AUTOMATIONS_COL, "description", 1000, true)
  );
  await safe(`Enum attr "category" (automations)`, () =>
    db.createEnumAttribute(
      DATABASE_ID,
      AUTOMATIONS_COL,
      "category",
      ["AI/LLM", "CRM & Ops", "DevOps"],
      true
    )
  );
  await safe(`String attr "trigger" (automations)`, () =>
    db.createStringAttribute(DATABASE_ID, AUTOMATIONS_COL, "trigger", 255, true)
  );
  await safe(`String[] attr "flowNodes" (automations)`, () =>
    db.createStringAttribute(DATABASE_ID, AUTOMATIONS_COL, "flowNodes", 255, true, undefined, true)
  );
  await safe(`String attr "metricBadge" (automations)`, () =>
    db.createStringAttribute(DATABASE_ID, AUTOMATIONS_COL, "metricBadge", 100, true)
  );
  await safe(`String attr "samplePayload" (automations)`, () =>
    db.createStringAttribute(DATABASE_ID, AUTOMATIONS_COL, "samplePayload", 5000, true)
  );
}

async function ensureMessagesAttributes(db: Databases): Promise<void> {
  await safe(`String attr "name" (contact_messages)`, () =>
    db.createStringAttribute(DATABASE_ID, MESSAGES_COL, "name", 100, true)
  );
  await safe(`Email attr "email" (contact_messages)`, () =>
    db.createEmailAttribute(DATABASE_ID, MESSAGES_COL, "email", true)
  );
  await safe(`String attr "projectType" (contact_messages)`, () =>
    db.createStringAttribute(DATABASE_ID, MESSAGES_COL, "projectType", 100, true)
  );
  await safe(`String attr "message" (contact_messages)`, () =>
    db.createStringAttribute(DATABASE_ID, MESSAGES_COL, "message", 2000, true)
  );
  await safe(`Enum attr "status" (contact_messages)`, () =>
    db.createEnumAttribute(
      DATABASE_ID,
      MESSAGES_COL,
      "status",
      ["unread", "processed"],
      true,
      "unread"
    )
  );
}

async function ensureBucket(storage: Storage): Promise<void> {
  await safe(`Create storage bucket "${BUCKET_ID}"`, () =>
    storage.createBucket(BUCKET_ID, "Portfolio Assets", READ_WRITE)
  );
}

async function main(): Promise<void> {
  const client = createAdminClient();
  const db = new Databases(client);
  const storage = new Storage(client);

  console.log("\nSetting up Appwrite portfolio backend…\n");

  await ensureDatabase(db);
  await ensureCollections(db);
  await ensureProjectsAttributes(db);
  await ensureAutomationsAttributes(db);
  await ensureMessagesAttributes(db);
  await ensureBucket(storage);

  console.log("\n✓ Appwrite setup complete.\n");
}

main().catch((error) => {
  console.error("\n✗ Appwrite setup failed.\n", error);
  process.exit(1);
});