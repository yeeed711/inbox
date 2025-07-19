import { FloatingActionButton } from "@/components/FloatingActionButton";
import { InboxItem } from "@/components/InboxItem";
import { MemoModal } from "@/components/MemoModal";
import { SearchInput } from "@/components/SearchInput";
import type { InboxItem as InboxItemType } from "@/types";
import { Button } from "@expo/ui/swift-ui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

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

const SAMPLE_INBOX_ITEMS: InboxItemType[] = [
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
  const handleSaveMemo = (memoText: string) => {
    console.log("메모 저장:", memoText);
    setIsModalVisible(false);
  };

  // 모달 취소 핸들러
  const handleCancelMemo = () => {
    setIsModalVisible(false);
  };

  // 더보기 버튼 핸들러
  const handleMorePress = (itemId: string) => {
    console.log("More options for", itemId);
  };

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
        <SearchInput value={searchText} onChangeText={setSearchText} />

        {/* 콘텐츠 목록 */}
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.itemList}>
              {filteredItems.map((item) => (
                <InboxItem
                  key={item.id}
                  item={item}
                  onMorePress={handleMorePress}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 플로팅 액션 버튼 */}
        <FloatingActionButton onPress={handleAddMemo} />

        {/* 메모 작성 모달 */}
        <MemoModal
          visible={isModalVisible}
          onClose={handleCancelMemo}
          onSave={handleSaveMemo}
        />
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
});
