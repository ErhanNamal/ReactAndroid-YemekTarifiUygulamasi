// screens/Favoriler.js
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCard";
import BarcodeModal from "../components/BarcodeModal";
import { useApp } from "../src/context/AppContext";

export default function Favoriler({ navigation }) {
  const { favoriIdler, tarifler } = useApp();
  const { theme } = useApp();
  const [barcodeModalVisible, setBarcodeModalVisible] = useState(false);

  // Header'ı barkod butonu ile güncelle
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => setBarcodeModalVisible(true)}
            style={{ marginRight: 12 }}
          >
            <Ionicons name="barcode" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, theme]);

  const favoriTarifler = (tarifler || []).filter((tarif) =>
    favoriIdler.includes(tarif.id),
  );

  const renderFavori = ({ item }) => (
    <RecipeCard
      item={item}
      favoriMi={true}
      onPress={() => navigation.navigate("TarifDetayFavori", { ...item })}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, paddingTop: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', marginVertical: 12, color: theme.primary }}>Favori Tariflerim</Text>
      {favoriTarifler.length === 0 ? (
        <View className="flex-1 justify-center items-center px-10">
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.textPrimary, textAlign: 'center', marginBottom: 10 }}>
            Henüz favori tarif eklemediniz.
          </Text>
          <Text style={{ fontSize: 14, color: theme.textSecondary, textAlign: 'center', lineHeight: 20 }}>
            Tarifler sekmesinden bir tarife tıklayın ve kalp ikonuna basarak ekleyin.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoriTarifler}
          renderItem={renderFavori}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <BarcodeModal
        visible={barcodeModalVisible}
        onClose={() => setBarcodeModalVisible(false)}
      />
    </View>
  );
}
