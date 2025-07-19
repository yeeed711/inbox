import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface FloatingActionButtonProps {
  onPress: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
}

export function FloatingActionButton({
  onPress,
  iconName = "add",
  iconSize = 24,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.fabContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={["rgba(59, 130, 246, 0.2)", "rgba(96, 165, 250, 0.2)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.fab}
      >
        <Ionicons name={iconName} size={iconSize} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    marginLeft: -28, // width의 절반만큼 왼쪽으로 이동
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden", // LinearGradient를 감싸는 컨테이너에 대한 속성
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3, // #3B82F64D의 4D는 30% 투명도
    shadowRadius: 7, // 14px blur radius를 React Native에 맞게 조정
    elevation: 8, // Android shadow
  },
  fab: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
