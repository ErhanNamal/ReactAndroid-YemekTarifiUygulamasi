# Mutfak Rehberi (React Native / Expo)

Bu proje, basit bir mobil tarif uygulamasıdır. Mevcut kod tabanına koyu mod (dark mode) desteği, tema tercihini persist etme, `Ayarlar` ekranı ve bazı UI iyileştirmeleri eklendi.

## Öne çıkan özellikler
- Tarif listeleme, detay görüntüleme, favorilere ekleme
- Tarif ekleme / kategori ekleme modalı
- Kalıcı kullanıcı oturumu (basit mock)
- Koyu/Aydın tema (dark mode) — uygulama genelinde tema toggle ve `Ayarlar` ekranı

## Hızlı başlangıç

1. Bağımlılıkları kurun

```powershell
npm install
```

2. Geliştirme sunucusunu başlatın (Expo)

```powershell
npm run start
```

3. Cihazda çalıştırma

- Android emülatörü veya fiziksel cihaz bağlıyken:

```powershell
npm run android
```

- Web için:

```powershell
npm run web
```

## APK / Üretim derlemesi (EAS)

Projede `eas.json` varsa EAS ile önizleme veya üretim derlemeleri oluşturabilirsiniz. Expo EAS kurulu olduğundan emin olun ve hesabınızla oturum açın:

```powershell
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## Koyu Mod (Dark Mode)
- Uygulama `AppContext` aracılığıyla tema yönetimi yapar. Kullanıcı tercihi AsyncStorage içinde saklanır ve uygulama yeniden başlatıldığında korunur.
- Tema, `tailwind.config.js` içinde `darkMode: 'class'` kullanılarak yerel (`nativewind`) dark sınıflarıyla desteklenir. Root komponent `App.js` içindeki kök View, tema `isDark` olduğunda `className="dark"` ile sarılır.
- Tema açma/kapatma için iki yol:
  - Header'daki güneş/ay ikonu (ana ekran)
  - `Ayarlar` sekmesi -> `Koyu Mod` anahtarı

## Değişiklikler (kısa)
- Tema durumu eklendi ve AsyncStorage'a kaydediliyor (`src/hooks/useStorage.js`, `src/context/AppContext.jsx`).
- `Settings` ekranı eklendi: `screens/Settings.js`.
- `AppNavigator`'a `Ayarlar` sekmesi eklendi ve Navigator tema renklerini kullanacak şekilde güncellendi.
- `MyButton`, `RecipeCard`, `AddModal`, `TarifListesi`, `TarifDetay`, `Favoriler`, `Auth` ekranlarında tema uyumlu stiller eklendi.

## Hata ayıklama / sık karşılaşılan sorunlar
- Uygulama açılırken anında kapanıyorsa ("yükleniyor" ekranında kapanma):
  - Metro server'ın çalıştığını doğrulayın (`npm run start`). Telefon ve geliştirme makineniz aynı ağda olmalı.
  - Konsolda hata görmüyorsanız, uygulamayı Expo Go yerine `npm run android` ile doğrudan çalıştırıp ADB loglarını kontrol edin.
  - Eğer "View is not defined" veya benzeri ReferenceError'lar varsa dosyalarda eksik importlar olabilir — bu repoda başlıca eksik import `View` için düzeltildi (`src/navigation/AppNavigator.jsx`).

## Geliştirme notları ve sonraki adımlar
- Tüm stil tanımlarını tek bir yaklaşıma (nativewind `dark:` sınıfları veya tamamen inline theme) göre normalize etmek tutarlılığı artırır. İsterseniz bunu adım adım yapabilirim.
- UI/UX geliştirmeleri: daha iyi kontrast, animasyonlar, görsel tasarım iyileştirmeleri eklenebilir.

## Katkıda bulunma
- Projeyi fork'layın, branch açın, değişiklik yapın ve pull request gönderin.

## Lisans
- Bu proje örnek amaçlıdır. Kişisel veya eğitim amaçlı kullanabilirsiniz.

## İletişim
- Başka bir özellik isterseniz veya hata raporu varsa bana söyleyin; hızlıca düzeltip test edeyim.
