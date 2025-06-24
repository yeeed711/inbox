import { EmptyState } from "@/components/empty-state";
import { WebhookCard } from "@/components/webhook-card";
import { colors } from "@/constants/colors";
import { useContentStore } from "@/store/content-store";
import { useWebhookStore } from "@/store/webhook-store";
import { router } from "expo-router";
import { Globe, Plus, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const webhooks = useWebhookStore((state) => state.webhooks);
  const clearItems = useContentStore((state) => state.clearItems);

  const handleAddWebhook = () => {
    router.push("/webhook-form");
  };

  const handleEditWebhook = (webhook: any) => {
    router.push({
      pathname: "/webhook-form",
      params: { id: webhook.id },
    });
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all captured content? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => clearItems(),
        },
      ]
    );
  };

  if (webhooks.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="No Webhooks Configured"
          message="Add a webhook to start sending your captured content to external services."
          icon={<Globe size={40} color={colors.primary} />}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddWebhook}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Webhook</Text>
        </TouchableOpacity>

        <View style={styles.dangerZone}>
          <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={handleClearHistory}
          >
            <Trash2 size={18} color={colors.error} />
            <Text style={styles.dangerButtonText}>Clear Content History</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={webhooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WebhookCard webhook={item} onEdit={handleEditWebhook} />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Configured Webhooks</Text>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddWebhook}
            >
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Webhook</Text>
            </TouchableOpacity>

            <View style={styles.dangerZone}>
              <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
              <TouchableOpacity
                style={styles.dangerButton}
                onPress={handleClearHistory}
              >
                <Trash2 size={18} color={colors.error} />
                <Text style={styles.dangerButtonText}>
                  Clear Content History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    marginTop: 16,
  },
  dangerZone: {
    marginTop: 32,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: 8,
    backgroundColor: "rgba(255, 59, 48, 0.05)",
  },
  dangerZoneTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.error,
    marginBottom: 16,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
  },
  dangerButtonText: {
    color: colors.error,
    fontSize: 16,
  },
});
