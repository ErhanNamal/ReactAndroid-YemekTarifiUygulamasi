import "./global.css";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { AppProvider, useApp } from "./src/context/AppContext";
import { AppNavigator } from "./src/navigation/AppNavigator";

const AppContent = () => {
  const { yukleniyor, isDark, theme } = useApp();

  if (yukleniyor) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 12, color: theme.textSecondary }}>Lezzetler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View className={isDark ? "dark" : ""} style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
