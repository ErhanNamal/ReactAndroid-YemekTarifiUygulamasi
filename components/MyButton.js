import { twMerge } from 'tailwind-merge';
import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { useApp } from "../src/context/AppContext";

export default function MyButton({ 
  text, 
  onPress, 
  className = "", 
  rounded = "full", 
  style = {}, 
  overrideStyles = false,
  icon = null,
}) {
    const { theme } = useApp();

    // Varsayılan sınıflar
    const defaultStyles = `mr-[15px] bg-ana p-3 rounded-${rounded} items-center shadow-sm flex-row justify-center dark:bg-ana`;
    
    // Sınıfları birleştirme mantığı
    const finalClassName = overrideStyles 
        ? className 
        : twMerge(defaultStyles, className);

    return (
        <TouchableOpacity 
            onPress={onPress} 
            className={finalClassName} 
            style={[{ opacity: 1 }, style]}
            activeOpacity={0.7}>
            {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
            <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }}>{text}</Text>
        </TouchableOpacity>
    );
}