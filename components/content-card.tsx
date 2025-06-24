import { colors } from "@/constants/colors";
import { useContentStore } from "@/store/content-store";

import { ContentItem } from "@/types";
import { uploadToAllWebhooks } from "@/utils/upload-manager";

import { Image as ExpoImage } from "expo-image";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Trash2,
} from "lucide-react-native";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ContentCardProps {
  item: ContentItem;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const deleteItem = useContentStore((state) => state.deleteItem);

  const handleRetry = () => {
    uploadToAllWebhooks(item.id);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Content",
      "Are you sure you want to delete this content?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteItem(item.id),
        },
      ]
    );
  };

  const renderStatusIcon = () => {
    switch (item.uploadStatus) {
      case "success":
        return <CheckCircle size={20} color={colors.success} />;
      case "failed":
        return <AlertCircle size={20} color={colors.error} />;
      case "uploading":
        return <RefreshCw size={20} color={colors.primary} />;
      case "pending":
      default:
        return <Clock size={20} color={colors.inactive} />;
    }
  };

  const renderContent = () => {
    if (item.type === "note") {
      return (
        <View style={styles.noteContainer}>
          <Text style={styles.noteText} numberOfLines={5}>
            {item.data}
          </Text>
        </View>
      );
    } else {
      return (
        <ExpoImage
          source={{ uri: item.data }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
      );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {item.title ||
            (item.type === "photo"
              ? "Photo"
              : item.type === "gallery"
              ? "Gallery Image"
              : "Note")}
        </Text>
        <View style={styles.statusContainer}>
          {renderStatusIcon()}
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>

      {renderContent()}

      <View style={styles.actions}>
        {item.uploadStatus === "failed" && (
          <TouchableOpacity style={styles.actionButton} onPress={handleRetry}>
            <RefreshCw size={18} color={colors.primary} />
            <Text style={styles.actionText}>Retry</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
          <Trash2 size={18} color={colors.error} />
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: colors.inactive,
  },
  noteContainer: {
    padding: 12,
    backgroundColor: colors.background,
    minHeight: 100,
  },
  noteText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 14,
    color: colors.primary,
  },
  deleteText: {
    color: colors.error,
  },
});
