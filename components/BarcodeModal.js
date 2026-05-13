import React from "react";
import { Alert, Modal, View, TouchableOpacity, Image, Text, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../src/context/AppContext";

const RESTAURANT_URL = "https://resturantprojesi-a.netlify.app/";

export default function BarcodeModal({ visible, onClose }) {
  const { theme } = useApp();

  const handleOpenWebsite = async () => {
    const canOpen = await Linking.canOpenURL(RESTAURANT_URL);
    if (canOpen) {
      await Linking.openURL(RESTAURANT_URL);
    } else {
      Alert.alert("Hata", "Web sitesi açılamıyor.");
    }
  };

  // QR kod API'sini kullanarak QR kod oluştur
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(RESTAURANT_URL)}`;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: theme.background,
            borderRadius: 16,
            padding: 24,
            width: "85%",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* Başlık */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: theme.textPrimary,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Restoranımızı Ziyaret Edin
          </Text>

          {/* QR Kod */}
          <View
            style={{
              backgroundColor: theme.card,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: qrCodeUrl }}
              style={{ width: 280, height: 280 }}
              resizeMode="contain"
            />
          </View>

          {/* URL Metni */}
          <Text
            style={{
              fontSize: 13,
              color: theme.textSecondary,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {RESTAURANT_URL}
          </Text>

          {/* Butonlar */}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={handleOpenWebsite}
              style={{
                flex: 1,
                backgroundColor: theme.primary,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginRight: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="open-outline" size={18} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  marginLeft: 8,
                }}
              >
                Aç
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                backgroundColor: theme.card,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="close" size={18} color={theme.textPrimary} />
              <Text
                style={{
                  color: theme.textPrimary,
                  fontWeight: "700",
                  marginLeft: 8,
                }}
              >
                Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
