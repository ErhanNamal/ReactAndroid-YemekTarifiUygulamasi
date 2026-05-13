import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  TARIFLER: "@mutfakrehberi:tarifler",
  FAVORI_IDLER: "@mutfakrehberi:favoriIdler",
  USER: "@mutfakrehberi:user",
  THEME: "@mutfakrehberi:theme",
};

const isAsyncStorageAvailable = () => {
  return AsyncStorage && AsyncStorage.setItem && AsyncStorage.getItem;
};

export const useStorage = () => {
  const loadData = async (key) => {
    if (!isAsyncStorageAvailable()) {
      console.log(`Storage not available, skipping load for ${key}`);
      return null;
    }
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.log(`Error loading ${key}:`, e.message);
      return null;
    }
  };

  const saveData = async (key, value) => {
    if (!isAsyncStorageAvailable()) {
      console.log(`Storage not available, skipping save for ${key}`);
      return;
    }
    try {
      if (value === null) {
        await AsyncStorage.removeItem(key);
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.log(`Error saving ${key}:`, e.message);
    }
  };

  const loadAll = async () => {
    if (!isAsyncStorageAvailable()) {
      return { tarifler: null, favoriIdler: null, user: null };
    }
    try {
      const [tarifler, favoriIdler, user, theme] = await Promise.all([
        loadData(STORAGE_KEYS.TARIFLER),
        loadData(STORAGE_KEYS.FAVORI_IDLER),
        loadData(STORAGE_KEYS.USER),
        loadData(STORAGE_KEYS.THEME),
      ]);
      return { tarifler, favoriIdler, user, theme };
    } catch (e) {
      console.log("Error loading all data:", e.message);
      return { tarifler: null, favoriIdler: null, user: null, theme: null };
    }
  };

  const saveTarifler = (value) => saveData(STORAGE_KEYS.TARIFLER, value);
  const saveFavoriIdler = (value) => saveData(STORAGE_KEYS.FAVORI_IDLER, value);
  const saveUser = (value) => saveData(STORAGE_KEYS.USER, value);
  const removeUser = () => saveData(STORAGE_KEYS.USER, null);
  const saveTheme = (value) => saveData(STORAGE_KEYS.THEME, value);
  const loadTheme = async () => await loadData(STORAGE_KEYS.THEME);

  return {
    loadData,
    saveData,
    loadAll,
    saveTarifler,
    saveFavoriIdler,
    saveUser,
    removeUser,
    saveTheme,
    loadTheme,
  };
};
