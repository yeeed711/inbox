import { colors } from "@/constants/colors";
import { useWebhookStore } from "@/store/webhook-store";
import { WebhookConfig } from "@/types";
import {
  Camera,
  Edit2,
  FileText,
  Globe,
  Image as ImageIcon,
  Trash2,
} from "lucide-react-native";
import React from "react";
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WebhookCardProps {
  webhook: WebhookConfig;
  onEdit: (webhook: WebhookConfig) => void;
}

export const WebhookCard: React.FC<WebhookCardProps> = ({
  webhook,
  onEdit,
}) => {
  const { toggleWebhook, deleteWebhook } = useWebhookStore();

  const handleToggle = () => {
    toggleWebhook(webhook.id);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Webhook",
      "Are you sure you want to delete this webhook?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteWebhook(webhook.id),
        },
      ]
    );
  };

  const renderCategoryIcons = () => {
    if (webhook.categories.includes("all")) {
      return (
        <View style={styles.categoryIconsContainer}>
          <View style={styles.categoryIcon}>
            <Camera size={14} color={colors.primary} />
          </View>
          <View style={styles.categoryIcon}>
            <ImageIcon size={14} color={colors.primary} />
          </View>
          <View style={styles.categoryIcon}>
            <FileText size={14} color={colors.primary} />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.categoryIconsContainer}>
        {webhook.categories.includes("photo") && (
          <View style={styles.categoryIcon}>
            <Camera size={14} color={colors.primary} />
          </View>
        )}
        {webhook.categories.includes("gallery") && (
          <View style={styles.categoryIcon}>
            <ImageIcon size={14} color={colors.primary} />
          </View>
        )}
        {webhook.categories.includes("note") && (
          <View style={styles.categoryIcon}>
            <FileText size={14} color={colors.primary} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Globe size={18} color={colors.primary} />
          <Text style={styles.title}>{webhook.name}</Text>
        </View>
        <Switch
          value={webhook.enabled}
          onValueChange={handleToggle}
          trackColor={{ false: colors.inactive, true: colors.primary }}
          thumbColor={colors.background}
        />
      </View>

      <View style={styles.urlContainer}>
        <Text style={styles.urlLabel}>URL:</Text>
        <Text style={styles.url} numberOfLines={1}>
          {webhook.url}
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesLabel}>Categories:</Text>
        {renderCategoryIcons()}
      </View>

      {Object.keys(webhook.headers).length > 0 && (
        <View style={styles.headersContainer}>
          <Text style={styles.headersLabel}>Headers:</Text>
          {Object.entries(webhook.headers).map(([key, value]) => (
            <Text key={key} style={styles.headerItem}>
              {key}: {value}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(webhook)}
        >
          <Edit2 size={18} color={colors.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

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
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  urlContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  urlLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginRight: 8,
  },
  url: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoriesLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginRight: 8,
  },
  categoryIconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  headersContainer: {
    marginTop: 8,
  },
  headersLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: 4,
  },
  headerItem: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 16,
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
