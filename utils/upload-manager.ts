import { useContentStore } from "@/store/content-store";
import { useWebhookStore } from "@/store/webhook-store";
import { ContentItem, WebhookConfig } from "@/types";
import { Platform } from "react-native";

// Helper to compress image data before upload
const compressImageData = async (base64Data: string): Promise<string> => {
  // In a real app, you would use a library like react-native-image-manipulator
  // For MVP, we'll just return the original data
  return base64Data;
};

// Upload content to a webhook
export const uploadToWebhook = async (
  content: ContentItem,
  webhook: WebhookConfig
): Promise<boolean> => {
  // Check if webhook supports this content type
  if (
    !webhook.categories.includes(content.type) &&
    !webhook.categories.includes("all")
  ) {
    return false;
  }

  try {
    // Update status to uploading
    useContentStore.getState().updateItemStatus(content.id, "uploading");

    // Prepare data based on content type
    let processedData = content.data;
    if (content.type === "photo" || content.type === "gallery") {
      processedData = await compressImageData(content.data);
    }

    // Prepare payload
    const payload = {
      type: content.type,
      data: processedData,
      title: content.title,
      timestamp: content.createdAt,
      device: Platform.OS,
    };

    // Send to webhook
    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...webhook.headers,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Update status to success
    useContentStore.getState().updateItemStatus(content.id, "success");
    return true;
  } catch (error) {
    // Update status to failed
    useContentStore.getState().updateItemStatus(content.id, "failed");
    console.error("Upload failed:", error);
    return false;
  }
};

// Upload content to all enabled webhooks
export const uploadToAllWebhooks = async (contentId: string): Promise<void> => {
  const content = useContentStore
    .getState()
    .items.find((item) => item.id === contentId);
  const webhooks = useWebhookStore
    .getState()
    .webhooks.filter((webhook) => webhook.enabled);

  if (!content || webhooks.length === 0) return;

  // Upload to each webhook that supports this content type
  const applicableWebhooks = webhooks.filter(
    (webhook) =>
      webhook.categories.includes(content.type) ||
      webhook.categories.includes("all")
  );

  if (applicableWebhooks.length === 0) return;

  const results = await Promise.all(
    applicableWebhooks.map((webhook) => uploadToWebhook(content, webhook))
  );

  // If all uploads failed, mark as failed
  if (results.every((result) => !result)) {
    useContentStore.getState().updateItemStatus(content.id, "failed");
  }
  // If some succeeded, mark as success
  else if (results.some((result) => result)) {
    useContentStore.getState().updateItemStatus(content.id, "success");
  }
};

// Retry failed uploads
export const retryFailedUploads = async (): Promise<void> => {
  const failedItems = useContentStore
    .getState()
    .items.filter(
      (item) => item.uploadStatus === "failed" && item.retryCount < 3
    );

  for (const item of failedItems) {
    await uploadToAllWebhooks(item.id);
  }
};
