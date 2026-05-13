import React from "react";
import { View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

export default function QRCodeShareModal({ visible, onClose, recipeData, theme }) {
  // Tarif verilerinden QR kod için URL oluştur
  const qrData = `recipe_${recipeData.id}`;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 20,
            alignItems: "center",
            width: "100%",
            maxWidth: 350,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: theme.textPrimary, fontSize: 18, fontWeight: "bold" }}>
              QR Kod Paylaş
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          <Text style={{ color: theme.textSecondary, textAlign: "center", marginBottom: 16 }}>
            {recipeData.isim}
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            <QRCode value={qrData} size={200} />
          </View>

          <Text style={{ color: theme.textSecondary, fontSize: 12, textAlign: "center", marginBottom: 16 }}>
            Bu QR kodu tarayın veya başkasına gönderin
          </Text>

          <Text
            style={{
              color: theme.primary,
              fontSize: 13,
              fontWeight: "bold",
              backgroundColor: theme.background,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
              textAlign: "center",
              width: "100%",
            }}
          >
            ID: {recipeData.id}
          </Text>
        </View>
      </View>
    </Modal>
  );
}
