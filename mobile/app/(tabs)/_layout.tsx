import HomeHeader from "@/src/components/Headers/HomeHeader";
import { COLORS, FONTS } from "@/src/constants";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { useSettingsStore } from "@/src/store/settingsStore";
import SettingsHeader from "@/src/components/Headers/SettingsHeader";
import HistoryHeader from "@/src/components/Headers/HistoryHeader";
const { width } = Dimensions.get("window");
const Layout = () => {
  const { settings } = useSettingsStore();
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
          backgroundColor: COLORS.tertiary,
          elevation: 0,
          width: 355,
          bottom: 30,
          borderRadius: 999,
          height: 65,
          position: "absolute",
          marginLeft: width / 2 - 355 / 2,
        },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: COLORS.main,
        tabBarActiveTintColor: COLORS.white,
        headerShown: true,
        tabBarLabelStyle: {
          fontFamily: FONTS.bold,
          fontSize: 10,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={1}
            style={[StyleSheet.absoluteFill]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Tool",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="dashboard" size={size} color={color} />
          ),
          header: () => <HomeHeader />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <Feather name="activity" size={size} color={color} />
          ),
          headerShown: true,
          header: () => <HistoryHeader />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
          headerShown: true,
          header: () => <SettingsHeader />,
        }}
      />
    </Tabs>
  );
};
export default Layout;
