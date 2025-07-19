import { Button } from "@expo/ui/swift-ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface InboxItem {
  id: string;
  time: string;
  title: string;
  badge: {
    text: string;
    color: string;
  };
}

const BADGE_COLORS = [
  "#FF6B6B", // 빨간색
  "#4ECDC4", // 청록색
  "#45B7D1", // 파란색
  "#96CEB4", // 연두색
  "#FFEAA7", // 노란색
  "#DDA0DD", // 보라색
  "#FFB74D", // 주황색
];

const getRandomBadgeColor = () => {
  return BADGE_COLORS[Math.floor(Math.random() * BADGE_COLORS.length)];
};

const SAMPLE_INBOX_ITEMS: InboxItem[] = [
  {
    id: "1",
    time: "09:30",
    title: "Weekly Team Meeting",
    badge: {
      text: "Meeting",
      color: getRandomBadgeColor(),
    },
  },
  {
    id: "2",
    time: "14:15",
    title: "Project Review Discussion",
    badge: {
      text: "Review",
      color: getRandomBadgeColor(),
    },
  },
  {
    id: "3",
    time: "16:45",
    title: "Client Presentation Prep",
    badge: {
      text: "Urgent",
      color: getRandomBadgeColor(),
    },
  },
  {
    id: "4",
    time: "10:00",
    title: "Budget Planning Session",
    badge: {
      text: "Finance",
      color: getRandomBadgeColor(),
    },
  },
  {
    id: "5",
    time: "13:30",
    title: "Design System Updates",
    badge: {
      text: "Design",
      color: getRandomBadgeColor(),
    },
  },
];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [inboxItems, setInboxItems] = useState(SAMPLE_INBOX_ITEMS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [memoText, setMemoText] = useState("");

  const filteredItems = inboxItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.badge.text.toLowerCase().includes(searchText.toLowerCase())
  );

  // 플로팅 버튼 클릭 핸들러
  const handleAddMemo = () => {
    setIsModalVisible(true);
  };

  // 모달 저장 핸들러
  const handleSaveMemo = () => {
    if (memoText.trim()) {
      // 여기서 메모 저장 로직 구현
      console.log("메모 저장:", memoText);
      setMemoText("");
      setIsModalVisible(false);
    }
  };

  // 모달 취소 핸들러
  const handleCancelMemo = () => {
    setMemoText("");
    setIsModalVisible(false);
  };

  // 메모 작성 모달 컴포넌트
  const MemoModal = () => (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancelMemo}
    >
      <SafeAreaView style={styles.modalContainer}>
        {/* 모달 헤더 */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={handleCancelMemo}>
            <Text style={styles.cancelButton}>취소</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>메모 작성</Text>
          <TouchableOpacity onPress={handleSaveMemo}>
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

  return (
    <>
      {/* StatusBar 설정 */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#111111"
        translucent={false}
      />

      <SafeAreaView style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Smart Inbox</Text>
            <Button
              style={styles.settingsButton}
              variant="bordered"
              onPress={() => console.log("Settings")}
            >
              <Ionicons name="settings-outline" size={20} color="#ffffff" />
            </Button>
          </View>
        </View>

        {/* 검색창 */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search inbox..."
            placeholderTextColor="#999999"
          />
        </View>

        {/* 콘텐츠 목록 */}
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.itemList}>
              {filteredItems.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTime}>{item.time}</Text>
                    <TouchableOpacity
                      style={styles.moreButton}
                      onPress={() => console.log("More options for", item.id)}
                    >
                      <Text style={styles.moreButtonText}>...</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemTitle}>{item.title}</Text>

                  <View style={styles.badgeContainer}>
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: item.badge.color },
                      ]}
                    >
                      <Text style={styles.badgeText}>{item.badge.text}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 플로팅 액션 버튼 */}
        <TouchableOpacity
          style={styles.fabContainer}
          onPress={handleAddMemo}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["rgba(59, 130, 246, 0.2)", "rgba(96, 165, 250, 0.2)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fab}
          >
            <Ionicons name="add" size={24} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        {/* 메모 작성 모달 */}
        <MemoModal />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111", // Safe Area 배경색을 헤더와 동일하게
  },
  header: {
    backgroundColor: "#111111",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000000",
  },
  searchInput: {
    backgroundColor: "#222222",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollView: {
    flex: 1,
  },
  itemList: {
    backgroundColor: "#000000",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
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
