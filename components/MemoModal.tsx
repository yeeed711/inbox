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
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelButton}>취소</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>메모 작성</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>저장</Text>
          </TouchableOpacity>
        </View>

        {/* 텍스트 에리어 */}
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
    justifyContent: "space-between",
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
  textArea: {
    backgroundColor: "#222222",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: "top",
  },
});
