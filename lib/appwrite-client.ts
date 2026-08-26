import { Client, Storage } from "appwrite";

export function getAppwriteClient(): Client {
  const client = new Client();
  client.setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "https://cloud.appwrite.io/v1"
  );
  client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "");
  return client;
}

export function getAppwriteStorage(): Storage {
  return new Storage(getAppwriteClient());
}

export interface ImagePreviewOptions {
  width?: number;
  height?: number;
  gravity?: string;
  quality?: number;
  format?: string;
}

export function getImagePreviewUrl(
  fileId: string,
  options: ImagePreviewOptions = {}
): string | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(/\/+$/, "");
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const bucketId = process.env.APPWRITE_STORAGE_BUCKET_ID;

  if (!endpoint || !projectId || !bucketId || !fileId) {
    return null;
  }

  const { width = 960, height, gravity, quality, format } = options;

  const params = new URLSearchParams({ project: projectId, width: String(width) });
  if (height) params.set("height", String(height));
  if (gravity) params.set("gravity", gravity);
  if (quality) params.set("quality", String(quality));
  if (format) params.set("format", format);

  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/preview?${params.toString()}`;
}