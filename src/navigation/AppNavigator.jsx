import React, { Children } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";

import TarifListesi from "../../screens/TarifListesi";
import TarifDetay from "../../screens/TarifDetay";
import Favoriler from "../../screens/Favoriler";
import Settings from "../../screens/Settings";
import Auth from "../../screens/Auth";
import QRCodeScanner from "../../screens/QRCodeScanner";
import AddModal from "../../components/AddModal";
import MyButton from "../../components/MyButton";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TariflerStack = () => {
  const { toggleFavori, favoriIdler, tarifler, logout, setModalGorunur, theme, toggleTheme, isDark } = useApp();

  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen
        name="TarifListesi"
        component={TarifListesi}
        options={({ navigation }) => ({
          headerTitle: "Mutfak Rehberi",
          headerTitleStyle: { fontWeight: "bold", color: theme.textPrimary },
          headerLeft: () => (
            <TouchableOpacity onPress={logout} className="ml-2.5 flex-row items-center">
              <Ionicons name="log-out-outline" size={20} color="#E74C3C" />
              <Text style={{ color: '#E74C3C', fontWeight: '700', fontSize: 12, marginLeft: 6 }}>Çıkış</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity 
                onPress={() => navigation.navigate("QRCodeScanner")} 
                style={{ marginRight: 12 }}
              >
                <Ionicons name="qr-code" size={24} color={theme.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 12 }}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={theme.textPrimary} />
              </TouchableOpacity>
              <MyButton text="Yeni Ekle" onPress={() => setModalGorunur(true)}/>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="TarifDetay"
        component={TarifDetay}
        options={({ route }) => ({ title: route.params.isim, headerTintColor: theme.textPrimary, headerStyle: { backgroundColor: theme.background } })}
      />
      <Stack.Screen
        name="QRCodeScanner"
        component={QRCodeScanner}
        options={{ title: "QR Kod Tarayıcı", headerTintColor: theme.textPrimary, headerStyle: { backgroundColor: theme.background }, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const FavorilerStack = () => {
  const { theme, toggleTheme, isDark } = useApp();

  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen
        name="FavorilerEkran"
        component={Favoriler}
        options={({ navigation }) => ({
          headerTitle: "Favori Tariflerim",
          headerTitleStyle: { fontWeight: "bold", color: theme.textPrimary },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity 
                onPress={() => navigation.navigate("QRCodeScannerFavori")} 
                style={{ marginRight: 12 }}
              >
                <Ionicons name="qr-code" size={24} color={theme.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTheme}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="TarifDetayFavori"
        component={TarifDetay}
        options={({ route }) => ({ title: route.params.isim, headerTintColor: theme.textPrimary, headerStyle: { backgroundColor: theme.background } })}
      />
      <Stack.Screen
        name="QRCodeScannerFavori"
        component={QRCodeScanner}
        options={{ title: "QR Kod Tarayıcı", headerTintColor: theme.textPrimary, headerStyle: { backgroundColor: theme.background }, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const { theme, toggleTheme, isDark } = useApp();

  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.background } }}>
      <Stack.Screen
        name="SettingsEkran"
        component={Settings}
        options={({ navigation }) => ({
          headerTitle: "Ayarlar",
          headerTitleStyle: { fontWeight: "bold", color: theme.textPrimary },
          headerRight: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <TouchableOpacity 
                onPress={() => navigation.navigate("QRCodeScannerSettings")} 
                style={{ marginRight: 12 }}
              >
                <Ionicons name="qr-code" size={24} color={theme.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleTheme}>
                <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="QRCodeScannerSettings"
        component={QRCodeScanner}
        options={{ title: "QR Kod Tarayıcı", headerTintColor: theme.textPrimary, headerStyle: { backgroundColor: theme.background }, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const { favoriIdler, tarifler, theme } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 11 },
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5, backgroundColor: theme.card },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';
          if (route.name === "TariflerTab") iconName = 'restaurant';
          else if (route.name === "FavorilerTab") iconName = 'heart';
          else if (route.name === "AyarlarTab") iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="TariflerTab"
        component={TariflerStack}
        options={{
          title: "Tarifler",
          tabBarBadge: favoriIdler.length > 0 ? favoriIdler.length : null,
        }}
      />
      <Tab.Screen
        name="FavorilerTab"
        component={FavorilerStack}
        options={{ title: "Favoriler" }}
      />
      <Tab.Screen name="AyarlarTab" component={SettingsStack} options={{ title: "Ayarlar" }} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user, modalGorunur, setModalGorunur, addRecipe, addCategory } = useApp();

  return (
    <NavigationContainer>
      {!user ? (
        <Auth />
      ) : (
        <>
          <TabNavigator />
          <AddModal
            visible={modalGorunur}
            onClose={() => setModalGorunur(false)}
            onAddRecipe={addRecipe}
            onAddCategory={addCategory}
          />
        </>
      )}
    </NavigationContainer>
  );
};
