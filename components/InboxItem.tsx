import { InboxItem } from "@/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface InboxItemProps {
  item: InboxItem;
  onMorePress: (itemId: string) => void;
}

export function InboxItem({ item, onMorePress }: InboxItemProps) {
  const handleMorePress = () => {
    onMorePress(item.id);
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTime}>{item.time}</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMorePress}>
          <Text style={styles.moreButtonText}>...</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.itemTitle}>{item.title}</Text>

      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: item.badge.color }]}>
          <Text style={styles.badgeText}>{item.badge.text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#111111",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333333",
    minHeight: 120,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  itemTime: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "600",
  },
  moreButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "transparent",
    borderColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  moreButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 16,
  },
  itemTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "600",
    marginBottom: 12,
    lineHeight: 24,
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "600",
  },
});
