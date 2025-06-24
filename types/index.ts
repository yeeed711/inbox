// Content types
export type ContentType = "photo" | "gallery" | "note";

// Content item structure
export interface ContentItem {
  id: string;
  type: ContentType;
  createdAt: string;
  data: string; // Base64 for images, text for notes
  title?: string;
  uploadStatus: "pending" | "uploading" | "success" | "failed";
  retryCount: number;
}

// Webhook configuration
export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  headers: Record<string, string>;
  enabled: boolean;
  createdAt: string;
  categories: string[]; // 'photo', 'gallery', 'note', 'all'
}

// Upload status
export interface UploadStatus {
  contentId: string;
  webhookId: string;
  status: "pending" | "uploading" | "success" | "failed";
  error?: string;
  lastAttempt?: string;
}
