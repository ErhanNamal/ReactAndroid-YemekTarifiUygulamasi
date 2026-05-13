import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
  Linking,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useApp } from "../src/context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../components/MyButton";

export default function TarifDetay({ route, navigation }) {
  const { isim, sure, malzemeler, yapilis, id } = route.params;
  const { toggleFavori, favoriIdler } = useApp();
  const { theme } = useApp();
  const favoriMi = favoriIdler.includes(id);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [pendingShare, setPendingShare] = useState(null);

  React.useEffect(() => {
    if (pendingShare === 'native' && !shareModalVisible) {
      const message = formatMessage();
      Share.share({
        message: message,
        title: `${isim} - Tarifi`,
      }).catch(() => {});
      setPendingShare(null);
    }
  }, [shareModalVisible, pendingShare]);

  const formatMessage = () => {
    const malzemeListesi = malzemeler.map((m) => `▫ ${m}`).join("\n");
    const pufNoktalari = getPufNoktalari(isim);
    
    return `
╔═══════════════════════════════════╗
║      🍽️  ${isim.toUpperCase()}  🍽️      ║
╚═══════════════════════════════════╝

📋 KISA BİLGİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏱️  Hazırlama Süresi: ${sure} dakika
👥  Porsiyon: 4 kişilik
📊  Zorluk: ${getZorluk(sure)}
🏷️  Kategori: ${route.params.kategori || "Genel"}

📝 MALZEMELER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${malzemeListesi}

👨‍🍳 YAPILIŞI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${yapilis}

💡 PÜF NOKTALARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${pufNoktalari}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Paylaşan: Mutfak Rehberi
🌐 mutfakrehberi.com
    `.trim();
  };

  const handleNativeShare = () => {
    setPendingShare('native');
    setShareModalVisible(false);
  };

  const handleCopyToClipboard = async () => {
    setShareModalVisible(false);
    setTimeout(async () => {
      try {
        const message = formatMessage();
        await Clipboard.setStringAsync(message);
        Alert.alert("✅ Kopyalandı!", "Tarif panoya kopyalandı.");
      } catch (error) {
        Alert.alert("Hata", "Kopyalama sırasında bir hata oluştu.");
      }
    }, 100);
  };

  const handleShareWhatsApp = async () => {
    const message = formatMessage();
    const encodedMessage = encodeURIComponent(message);
    setShareModalVisible(false);
    
    setTimeout(async () => {
      try {
        await Linking.openURL(`whatsapp://send?text=${encodedMessage}`);
      } catch (error) {
        try {
          await Clipboard.setStringAsync(message);
        } catch (clipError) {}
        Alert.alert("✅ Kopyalandı!", "WhatsApp açılamadı.");
      }
    }, 100);
  };

  const getZorluk = (sure) => {
    if (sure <= 15) return "⭐ Çok Kolay";
    if (sure <= 30) return "⭐⭐ Kolay";
    if (sure <= 45) return "⭐⭐⭐ Orta";
    if (sure <= 60) return "⭐⭐⭐⭐ Zor";
    return "⭐⭐⭐⭐⭐ Usta Şef";
  };

  const getPufNoktalari = (isim) => {
    const pufMap = {
      "Menemen": "• Taze domates kullanın\n• Biberleri önce kavurun\n• Yumurtayı fazla pişirmeyin",
      "Makarna": "• Tuzlu suda haşlayın\n• Salçayı yağla kavurun\n• Rendelenmiş peynir ekleyin",
      "Tost": "• Ekmekleri tereyağlayın\n• Kaşarı eriyene kadar bekletin\n• köz domates kullanın",
      "Omlet": "• Yumurtaları çok çırpın\n• Tereyağı eriyince dökün\n• Katlarken kaşar ekleyin",
      "Mercimek Köftesi": "• Malzemeleri iyice karıştırın\n• Köfteleri ıslak elle şekillendirin\n• Sumaklı sos ile servis edin",
      "Mercimek Çorbası": "• Kırmızı mercimek daha lezzetli\n• Kremla daha kıvamlı olur\n• Nane ile süsleyin",
      "Köfte": "• Kıymayı 10 dk yoğurun\n• Buzdolabında dinlendirin\n• Izgara daha lezzetli olur",
      "Sütlaç": "• Pirinçleri önceden ıslatın\n• Sütü kaynatırken karıştırın\n• Üzerine tarçın serpin",
    };
    return pufMap[isim] || "• Taze malzemeler kullanın\n• Afiyet olsun!";
  };

  const ShareOption = ({ icon, title, subtitle, onPress, color }) => (
    <TouchableOpacity 
      className="flex-row items-center p-4 rounded-xl mb-3"
      onPress={onPress}
    >
      <View style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: color }}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: theme.textPrimary }}>{title}</Text>
        <Text style={{ fontSize: 12, color: theme.textSecondary }}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ backgroundColor: theme.primary, padding: 20, alignItems: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#fff', textAlign: 'center' }}>{isim}</Text>
        <Text style={{ fontSize: 16, color: '#D6EAF8', marginTop: 6 }}>{sure} dakika</Text>
      </View>

      <View style={{ flexDirection: 'row', marginHorizontal: 15, marginTop: 15, gap: 12 }}>
        <MyButton
          text={favoriMi ? "Favorilerden Çıkar" : "Favorilere Ekle"}
          className={`flex-1 justify-center items-center p-3.5 rounded-xl shadow-md ${favoriMi ? "bg-[#95A5A6]/70" : "bg-ana/70"}`}
          style={{ elevation: 4 }}
          icon={
            <Ionicons
              name={favoriMi ? "heart-dislike" : "heart"}
              size={22}
              color="white"
              style={{ marginRight: 8 }}
            />
          }
          onPress={() => {
            toggleFavori(id);
            navigation.goBack();
          }}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#27AE60', padding: 14, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 4 }}
          onPress={() => setShareModalVisible(true)}
        >
          <Ionicons name="share-social" size={22} color="white" />
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '700', marginTop: 6 }}>Paylaş</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 20, fontWeight: '700', marginHorizontal: 15, marginTop: 15, marginBottom: 8, color: theme.textPrimary }}>Malzemeler</Text>
      {malzemeler.map((malzeme, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 6 }}>
          <Text style={{ color: theme.primary, marginRight: 8 }}>•</Text>
          <Text style={{ fontSize: 15, color: theme.textPrimary, flex: 1 }}>{malzeme}</Text>
        </View>
      ))}

      <Text style={{ fontSize: 20, fontWeight: '700', marginHorizontal: 15, marginTop: 15, marginBottom: 8, color: theme.textPrimary }}>Yapılış</Text>
      <View style={{ marginHorizontal: 15, padding: 12, backgroundColor: theme.card, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7E9' }}>
        <Text style={{ fontSize: 15, color: theme.textPrimary, lineHeight: 22 }}>{yapilis}</Text>
      </View>

      <View style={{ height: 10 }} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <SafeAreaView>
            <View style={{ backgroundColor: theme.card, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: theme.textPrimary }}>Paylaş</Text>
                <TouchableOpacity onPress={() => setShareModalVisible(false)}>
                  <Ionicons name="close" size={24} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>

              <Text style={{ fontSize: 14, color: theme.textSecondary, marginBottom: 10 }}>Tarifini paylaşmak için bir seçenek belirle:</Text>

              <ShareOption
                icon="copy-outline"
                title="Panoya Kopyala"
                subtitle="WhatsApp, Instagram, Twitter için kopyala"
                color="#3498DB"
                onPress={handleCopyToClipboard}
              />

              <ShareOption
                icon="share-social-outline"
                title="Native Paylaşım"
                subtitle="Tüm uygulamalarla paylaş"
                color="#27AE60"
                onPress={handleNativeShare}
              />

              <ShareOption
                icon="logo-whatsapp"
                title="WhatsApp"
                subtitle="Doğrudan WhatsApp ile gönder"
                color="#25D366"
                onPress={handleShareWhatsApp}
              />

              <View style={{ height: 12 }} />
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </ScrollView>
  );
}
