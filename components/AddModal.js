import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import MyButton from "./MyButton";
import { useApp } from "../src/context/AppContext";

const AddModal = ({ visible, onClose, onAddRecipe, onAddCategory }) => {
    const [eklemeTuru, setEklemeTuru] = useState("tarif");
    const [yeniTarif, setYeniTarif] = useState({
        isim: "",
        sure: "",
        kategori: "Ana Yemek",
        malzemeler: "",
        yapilis: "",
    });
    const [yeniKategori, setYeniKategori] = useState("");

    const handleRecipeAdd = () => {
        if (!yeniTarif.isim || !yeniTarif.sure) return;
        onAddRecipe(yeniTarif);
        setYeniTarif({ isim: "", sure: "", kategori: "Ana Yemek", malzemeler: "", yapilis: "" });
    };

    const handleCategoryAdd = () => {
        if (!yeniKategori) return;
        onAddCategory(yeniKategori);
        setYeniKategori("");
    };

    const { theme } = useApp();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '90%', maxHeight: '80%', borderRadius: 20, padding: 20, elevation: 5, backgroundColor: theme.card }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                        <TouchableOpacity
                            onPress={() => setEklemeTuru("tarif")}
                            style={{ flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: eklemeTuru === 'tarif' ? 2 : 0, borderBottomColor: '#2980B9' }}
                        >
                            <Text style={{ fontSize: 16, color: eklemeTuru === 'tarif' ? '#2980B9' : theme.textSecondary, fontWeight: eklemeTuru === 'tarif' ? '700' : '600' }}>
                                Tarif
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setEklemeTuru("kategori")}
                            style={{ flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: eklemeTuru === 'kategori' ? 2 : 0, borderBottomColor: '#2980B9' }}
                        >
                            <Text style={{ fontSize: 16, color: eklemeTuru === 'kategori' ? '#2980B9' : theme.textSecondary, fontWeight: eklemeTuru === 'kategori' ? '700' : '600' }}>
                                Kategori
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {eklemeTuru === "tarif" ? (
                            <View>
                                <TextInput
                                    placeholder="Tarif İsmi"
                                    value={yeniTarif.isim}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, isim: text })}
                                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: theme.background, color: theme.textPrimary }}
                                />
                                <TextInput
                                    placeholder="Süre (Dakika)"
                                    keyboardType="numeric"
                                    value={yeniTarif.sure}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, sure: text })}
                                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: theme.background, color: theme.textPrimary }}
                                />
                                <TextInput
                                    placeholder="Kategori (örn: Kahvaltı)"
                                    value={yeniTarif.kategori}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, kategori: text })}
                                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: theme.background, color: theme.textPrimary }}
                                />
                                <TextInput
                                    placeholder="Malzemeler (Virgülle ayırın)"
                                    value={yeniTarif.malzemeler}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, malzemeler: text })}
                                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: theme.background, color: theme.textPrimary }}
                                />
                                <TextInput
                                    placeholder="Yapılış"
                                    multiline
                                    value={yeniTarif.yapilis}
                                    onChangeText={(text) => setYeniTarif({ ...yeniTarif, yapilis: text })}
                                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: theme.background, color: theme.textPrimary, height: 100, textAlignVertical: 'top' }}
                                />
                                <MyButton text="Tarif Ekle" rounded="lg" onPress={handleRecipeAdd}/>
                            </View>
                        ) : (
                            <View>
                                <TextInput
                                    placeholder="Kategori Adı"
                                    value={yeniKategori}
                                    onChangeText={setYeniKategori}
                                    style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16, backgroundColor: theme.background, color: theme.textPrimary }}
                                />
                                <MyButton text="Kategori Ekle" rounded="lg" onPress={handleCategoryAdd}/>
                            </View>
                        )}

                        <TouchableOpacity
                            style={{ backgroundColor: '#95a5a6', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 }}
                            onPress={onClose}
                        >
                            <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Vazgeç</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default AddModal;
