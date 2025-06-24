import { NoteEditor } from "@/components/note-editor";
import { useContentStore } from "@/store/content-store";
import { uploadToAllWebhooks } from "@/utils/upload-manager";
import { router } from "expo-router";
import React from "react";

export default function NoteEditorScreen() {
  const addItem = useContentStore((state) => state.addItem);

  const handleSave = (note: string, title?: string) => {
    const contentId = addItem("note", note, title);
    uploadToAllWebhooks(contentId);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return <NoteEditor onSave={handleSave} onCancel={handleCancel} />;
}
