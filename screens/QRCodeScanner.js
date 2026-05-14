import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet, Linking, Dimensions } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../src/context/AppContext";

const { width } = Dimensions.get("window");

export default function QRCodeScanner({ navigation }) {
  // 1. Kamera İzni Yönetimi
  const [permission, requestPermission] = useCameraPermissions();
  const { theme } = useApp();
  const [isScanning, setIsScanning] = useState(true);

  // 2. QR Kod Okunduğunda Çalışacak Fonksiyon
  const handleBarcodeScanned = async ({ data }) => {
    if (!isScanning) return;
    setIsScanning(false); // Aynı kodu üst üste okumasını engelle

    // Gelen verinin URL olup olmadığını kontrol et
    const isUrl = data.trim().startsWith("http://") || data.trim().startsWith("https://");

    if (isUrl) {
      Alert.alert(
        "Bağlantıyı Aç",
        "Bu web sitesine gitmek istiyor musunuz?\n\n" + data,
        [
          { 
            text: "İptal", 
            onPress: () => setIsScanning(true), 
            style: "cancel" 
          },
          { 
            text: "Git", 
            onPress: () => {
              Linking.openURL(data).catch(() => {
                Alert.alert("Hata", "Tarayıcı açılamadı.");
                setIsScanning(true);
              });
            } 
          }
        ]
      );
    } else {
      Alert.alert(
        "Geçersiz QR",
        "Bu QR kod bir web sitesi bağlantısı içermiyor:\n" + data,
        [{ text: "Tamam", onPress: () => setIsScanning(true) }]
      );
    }
  };

  // 3. Yükleme ve İzin Durumları
  if (!permission) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.textPrimary }}>Kamera hazırlanıyor...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Ionicons name="camera-off" size={64} color={theme.textSecondary} />
        <Text style={[styles.title, { color: theme.textPrimary }]}>Kamera İzni Gerekli</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          QR kodları tarayabilmek için kamera erişimine izin vermelisiniz.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={[styles.mainButton, { backgroundColor: theme.primary }]}
        >
          <Text style={styles.buttonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 4. Kamera Görünümü ve Arayüzü
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={isScanning ? handleBarcodeScanned : undefined}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        {/* Görsel Katman (Overlay) */}
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer} />
          <View style={styles.focusedRow}>
            <View style={styles.unfocusedContainer} />
            <View style={styles.targetBox}>
              {/* Köşe Çizgileri */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
            <View style={styles.unfocusedContainer} />
          </View>
          <View style={styles.unfocusedContainer}>
            <Text style={styles.infoText}>QR Kodu Kutunun İçine Yerleştirin</Text>
          </View>
        </View>

        {/* Kapatma Butonu */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  subtitle: { textAlign: "center", marginBottom: 30, fontSize: 14 },
  mainButton: { paddingHorizontal: 40, paddingVertical: 15, borderRadius: 12 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  unfocusedContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  focusedRow: { flexDirection: "row", height: 260 },
  targetBox: { width: 260, position: "relative" },
  infoText: { color: "#fff", fontSize: 16, fontWeight: "500", marginTop: 20 },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 30
  },
  corner: {
    position: "absolute",
    width: 35,
    height: 35,
    borderColor: "#4CAF50",
    borderWidth: 5,
  },
  topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
});