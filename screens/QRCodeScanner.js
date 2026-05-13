import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { CameraView } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../src/context/AppContext";

export default function QRCodeScanner({ navigation }) {
  const [permission, requestPermission] = React.useState(null);
  const { theme, tarifler } = useApp();
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await CameraView.requestCameraPermissionsAsync();
      requestPermission(status === "granted");
    };
    getCameraPermission();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setIsScanning(false);
    
    // QR koddan URL veya tarif ID'si alındı
    console.log("QR Kod Scanned:", data);
    
    let tarifId = null;

    // URL ise, URL'den tarif ID'sini ayıklamaya çalış
    if (data.includes("http")) {
      try {
        const url = new URL(data);
        tarifId = url.searchParams.get("id");
      } catch (e) {
        Alert.alert("Hata", "QR kod işlenemedi.");
        setIsScanning(true);
        return;
      }
    } else {
      // Sadece ID ise
      tarifId = data;
    }

    if (tarifId) {
      // Tarifler içinde bu ID'yi bul
      const tarif = tarifler.find((t) => t.id === tarifId);
      if (tarif) {
        // Tarifi bul ve detay sayfasına yönlendir
        navigation.navigate("TarifDetay", tarif);
      } else {
        Alert.alert("Tarif Bulunamadı", "Taşınan QR kod hiçbir tarife karşılık gelmiyor.");
        setIsScanning(true);
      }
    } else {
      Alert.alert("Geçersiz QR Kod", "Bu QR kod bir tarif bağlantısı değil.");
      setIsScanning(true);
    }
  };

  if (permission === null) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.textPrimary }}>Kamera izni isteniyor...</Text>
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name="camera-off" size={60} color={theme.textSecondary} style={{ marginBottom: 20 }} />
        <Text style={{ color: theme.textPrimary, fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Kamera İzni Gerekli
        </Text>
        <Text style={{ color: theme.textSecondary, textAlign: "center", paddingHorizontal: 20, marginBottom: 30 }}>
          QR kod okuyabilmek için kamera izni vermeniz gerekiyor.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{ backgroundColor: theme.primary, paddingHorizontal: 30, paddingVertical: 12, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <CameraView
        style={{ flex: 1 }}
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* Scan Frame Overlay */}
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 250,
              height: 250,
              borderWidth: 3,
              borderColor: "#4CAF50",
              borderRadius: 12,
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderTopWidth: 3,
                borderLeftWidth: 3,
                borderTopColor: "#4CAF50",
                borderLeftColor: "#4CAF50",
                top: -3,
                left: -3,
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderTopWidth: 3,
                borderRightWidth: 3,
                borderTopColor: "#4CAF50",
                borderRightColor: "#4CAF50",
                top: -3,
                right: -3,
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderBottomWidth: 3,
                borderLeftWidth: 3,
                borderBottomColor: "#4CAF50",
                borderLeftColor: "#4CAF50",
                bottom: -3,
                left: -3,
              }}
            />
            <View
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderBottomWidth: 3,
                borderRightWidth: 3,
                borderBottomColor: "#4CAF50",
                borderRightColor: "#4CAF50",
                bottom: -3,
                right: -3,
              }}
            />
          </View>

          <Text style={{ color: "#fff", marginTop: 50, fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
            QR Kod Tarayın
          </Text>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: 12,
            borderRadius: 50,
            zIndex: 10,
          }}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}
