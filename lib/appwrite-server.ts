import { Client, Databases, Storage, Users } from "node-appwrite";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        "Check your .env file against .env.example."
    );
  }
  return value;
}

export function createAdminClient(): Client {
  return new Client()
    .setEndpoint(getRequiredEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT"))
    .setProject(getRequiredEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID"))
    .setKey(getRequiredEnv("APPWRITE_API_KEY"));
}

let databases: Databases | null = null;
let storage: Storage | null = null;
let users: Users | null = null;

export function adminDatabases(): Databases {
  if (!databases) {
    databases = new Databases(createAdminClient());
  }
  return databases;
}

export function adminStorage(): Storage {
  if (!storage) {
    storage = new Storage(createAdminClient());
  }
  return storage;
}

export function adminUsers(): Users {
  if (!users) {
    users = new Users(createAdminClient());
  }
  return users;
}