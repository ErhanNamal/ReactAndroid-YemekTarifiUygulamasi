import { useState } from "react";
import { View, Text, FlatList, TextInput, ScrollView, TouchableOpacity } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { useApp } from "../src/context/AppContext";

export default function TarifListesi({ navigation }) {
  const { toggleFavori, favoriIdler, tarifler, theme } = useApp();
  const [aramaMetni, setAramaMetni] = useState("");
  const [seciliKategori, setSeciliKategori] = useState("Hepsi");

  const kategoriler = ["Hepsi", ...new Set((tarifler || []).map((t) => t.kategori).filter(Boolean))];

  const filtrelenmişTarifler = (tarifler || []).filter((tarif) => {
    const isimUyuyor = tarif.isim.toLowerCase().includes(aramaMetni.toLowerCase());
    const kategoriUyuyor = seciliKategori === "Hepsi" || tarif.kategori === seciliKategori;
    return isimUyuyor && kategoriUyuyor;
  });

  const renderTarif = ({ item }) => (
    <RecipeCard
      item={item}
      favoriMi={favoriIdler.includes(item.id)}
      onPress={() =>
        navigation.navigate("TarifDetay", {
          ...item,
        })
      }
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TextInput
        placeholder="Tarif ismiyle ara..."
        value={aramaMetni}
        onChangeText={setAramaMetni}
        style={{ height: 50, backgroundColor: theme.card, margin: 12, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7E9', color: theme.textPrimary }}
      />

      <View style={{ height: 50, marginBottom: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
          {kategoriler.map((kat) => (
            <TouchableOpacity
              key={kat}
              onPress={() => setSeciliKategori(kat)}
              style={{ paddingHorizontal: 15, height: 35, justifyContent: 'center', borderRadius: 18, marginHorizontal: 5, backgroundColor: seciliKategori === kat ? theme.primary : theme.card }}
            >
              <Text style={{ fontWeight: '700', color: seciliKategori === kat ? '#fff' : theme.textSecondary }}>{kat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtrelenmişTarifler}
        renderItem={renderTarif}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: theme.textSecondary, fontSize: 16 }}>Sonuç bulunamadı.</Text>}
      />
    </View>
  );
}
