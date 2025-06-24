import { WebhookConfig } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WebhookState {
  webhooks: WebhookConfig[];
  addWebhook: (
    name: string,
    url: string,
    headers: Record<string, string>,
    categories: string[]
  ) => string;
  updateWebhook: (id: string, data: Partial<WebhookConfig>) => void;
  deleteWebhook: (id: string) => void;
  toggleWebhook: (id: string) => void;
}

export const useWebhookStore = create<WebhookState>()(
  persist(
    (set) => ({
      webhooks: [],

      addWebhook: (name, url, headers, categories) => {
        const id = Date.now().toString();
        const newWebhook: WebhookConfig = {
          id,
          name,
          url,
          headers,
          categories,
          enabled: true,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          webhooks: [...state.webhooks, newWebhook],
        }));

        return id;
      },

      updateWebhook: (id, data) => {
        set((state) => ({
          webhooks: state.webhooks.map((webhook) =>
            webhook.id === id ? { ...webhook, ...data } : webhook
          ),
        }));
      },

      deleteWebhook: (id) => {
        set((state) => ({
          webhooks: state.webhooks.filter((webhook) => webhook.id !== id),
        }));
      },

      toggleWebhook: (id) => {
        set((state) => ({
          webhooks: state.webhooks.map((webhook) =>
            webhook.id === id
              ? { ...webhook, enabled: !webhook.enabled }
              : webhook
          ),
        }));
      },
    }),
    {
      name: "webhook-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
