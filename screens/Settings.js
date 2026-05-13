import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useApp } from "../src/context/AppContext";

export default function Settings() {
  const { isDark, toggleTheme, theme } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.textPrimary }]}>Uygulama Ayarları</Text>

      <View style={[styles.row, { borderColor: '#E5E7E9' }]}> 
        <Text style={{ color: theme.textPrimary, fontSize: 16 }}>Koyu Mod</Text>
        <Switch value={isDark} onValueChange={toggleTheme} thumbColor={isDark ? theme.primary : '#fff'} trackColor={{ true: '#555', false: '#ccc' }} />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: theme.textSecondary }}>Tema örnekleri</Text>
        <View style={{ height: 12 }} />
        <View style={{ padding: 12, borderRadius: 8, backgroundColor: theme.card }}>
          <Text style={{ color: theme.textPrimary }}>Başlık - {theme.mode}</Text>
          <Text style={{ color: theme.textSecondary, marginTop: 6 }}>Bu, uygulamanın renk düzeni önizlemesidir.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
});
