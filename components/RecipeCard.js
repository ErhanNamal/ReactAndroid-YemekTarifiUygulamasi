import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../src/context/AppContext";

const RecipeCard = ({ item, onPress, favoriMi }) => {
    const { theme } = useApp();

    return (
        <TouchableOpacity
            className="mx-4 my-1.5 p-4 rounded-xl shadow-sm flex-row justify-between items-center"
            onPress={onPress}
            disabled={!onPress}
            style={{ elevation: 3, backgroundColor: theme.card, borderLeftWidth: 8, borderLeftColor: theme.primary + '66' }}
        >
            <View className="flex-1">
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.textPrimary }}>{item.isim}</Text>
                <View className="flex-row items-center mt-1">
                    <Ionicons name="time-outline" size={14} color={theme.primary} />
                    <Text style={{ marginLeft: 6, fontSize: 13, color: theme.textSecondary }}>{item.sure} dakika</Text>
                </View>
                <View className="mt-1 self-start px-2 py-0.5 rounded-full" style={{ backgroundColor: theme.background }}>
                    <Text style={{ fontSize: 11, color: theme.textSecondary, fontWeight: '600' }}>{item.kategori || "Genel"}</Text>
                </View>
            </View>

            <View className="ml-2">
                <Ionicons
                    name={favoriMi ? "heart" : "heart-outline"}
                    size={24}
                    color={favoriMi ? "#E74C3C" : "#BDC3C7"}
                />
            </View>
        </TouchableOpacity>
    );
};

export default RecipeCard;
