import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface MemoModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (memoText: string) => void;
}

export function MemoModal({ visible, onClose, onSave }: MemoModalProps) {
  const [memoText, setMemoText] = useState("");

  const handleSave = () => {
    if (memoText.trim()) {
      onSave(memoText.trim());
      setMemoText("");
    }
  };

  const handleCancel = () => {
    setMemoText("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel}
    >
      <SafeAreaView style={styles.modalContainer}>
        {/* 모달 헤더 */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>메모 작성</Text>
        </View>

        {/* 텍스트 에리어 */}
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              value={memoText}
              onChangeText={setMemoText}
              placeholder="메모를 입력하세요..."
              placeholderTextColor="#999999"
              multiline
              textAlignVertical="top"
              autoFocus
            />
            <TouchableOpacity style={styles.micButton}>
              <Ionicons name="mic" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* 버튼들 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButtonContainer}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButtonContainer}
              onPress={handleSave}
            >
              <LinearGradient
                colors={["#3B82F6", "#60A5FA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.9, y: 0.4 }}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>저장</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#111111",
    paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  cancelButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  saveButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textAreaContainer: {
    position: "relative",
    marginBottom: 16,
  },
  textArea: {
    backgroundColor: "#222222",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top",
  },
  micButton: {
    position: "absolute",
    bottom: 12,
    right: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
  },
  saveButtonContainer: {
    borderRadius: 8,
    flex: 1,
    overflow: "hidden",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 12,
  },
  cancelButtonContainer: {
    backgroundColor: "#111111",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  cancelButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
