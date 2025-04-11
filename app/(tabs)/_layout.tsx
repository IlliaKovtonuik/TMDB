import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, [string, string]> = {
            home: ["home", "home-outline"],
            search: ["search", "search-outline"],
            favorites: ["heart", "heart-outline"],
          };
          const [activeIcon, inactiveIcon] = icons[route.name] || [
            "alert-circle",
            "alert-circle-outline",
          ];
          const iconName = focused ? activeIcon : inactiveIcon;
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#472fd4",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="favorites" />
    </Tabs>
  );
}
