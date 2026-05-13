import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useApp } from "../src/context/AppContext";
import MyButton from "../components/MyButton";

export default function Auth() {
    const { setUser } = useApp();
    const { theme } = useApp();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        if (!email || !password) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }
        const userData = { email, name: email.split("@")[0] };
        setUser(userData);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', padding: 20 }}
        >
            <View style={{ backgroundColor: theme.card, padding: 20, borderRadius: 20, elevation: 10 }}>
                <Text style={{ fontSize: 28, fontWeight: '700', color: theme.textPrimary, marginBottom: 18, textAlign: 'center' }}>
                    {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                </Text>

                <TextInput
                    placeholder="E-posta"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ backgroundColor: theme.background, height: 50, borderRadius: 12, paddingHorizontal: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7E9', color: theme.textPrimary }}
                />

                <TextInput
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{ backgroundColor: theme.background, height: 50, borderRadius: 12, paddingHorizontal: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7E9', color: theme.textPrimary }}
                />

                <MyButton
                    text={isLogin ? "Giriş Yap" : "Kayıt Ol"}
                    className="bg-ana h-[50px] rounded-[12px] justify-center items-center mt-2.5"
                    overrideStyles={true}
                    onPress={handleSubmit}
                />

                <TouchableOpacity
                    style={{ marginTop: 14, alignItems: 'center' }}
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text style={{ color: theme.textPrimary, fontSize: 14 }}>
                        {isLogin
                            ? "Hesabınız yok mu? Kayıt Olun"
                            : "Zaten hesabınız var mı? Giriş Yapın"}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
