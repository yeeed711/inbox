import { ContentItem, ContentType } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ContentState {
  items: ContentItem[];
  addItem: (type: ContentType, data: string, title?: string) => string;
  updateItemStatus: (
    id: string,
    status: ContentItem["uploadStatus"],
    error?: string
  ) => void;
  deleteItem: (id: string) => void;
  clearItems: () => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (type, data, title) => {
        const id = Date.now().toString();
        const newItem: ContentItem = {
          id,
          type,
          data,
          title,
          createdAt: new Date().toISOString(),
          uploadStatus: "pending",
          retryCount: 0,
        };

        set((state) => ({
          items: [newItem, ...state.items],
        }));

        return id;
      },

      updateItemStatus: (id, status, error) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  uploadStatus: status,
                  retryCount:
                    status === "failed" ? item.retryCount + 1 : item.retryCount,
                }
              : item
          ),
        }));
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      clearItems: () => {
        set({ items: [] });
      },
    }),
    {
      name: "content-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
