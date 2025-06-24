import { WebhookForm } from "@/components/webhook-form";
import { useWebhookStore } from "@/store/webhook-store";
import { WebhookConfig } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

export default function WebhookFormScreen() {
  const params = useLocalSearchParams();
  const { webhooks, addWebhook, updateWebhook } = useWebhookStore();
  const [webhook, setWebhook] = useState<WebhookConfig | undefined>(undefined);

  useEffect(() => {
    if (params.id) {
      const found = webhooks.find((w) => w.id === params.id);
      if (found) {
        setWebhook(found);
      }
    }
  }, [params.id, webhooks]);

  const handleSave = (data: {
    name: string;
    url: string;
    headers: Record<string, string>;
    categories: string[];
  }) => {
    if (webhook) {
      updateWebhook(webhook.id, data);
    } else {
      addWebhook(data.name, data.url, data.headers, data.categories);
    }
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <WebhookForm
      webhook={webhook}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
