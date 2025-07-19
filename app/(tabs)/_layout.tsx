import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // 탭바가 필요할 때 사용하기.
        tabBarStyle: { display: "none" }, // tab-bar 완전히 숨김
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
