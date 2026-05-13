const tarifler = [
  {
    id: "1",
    isim: "Menemen",
    sure: 20,
    kategori: "Kahvaltı",
    malzemeler: ["3 Yumurta", "2 Domates", "2 Biber", "Tuz", "Sıvı Yağ"],
    yapilis:
      "Biberleri doğrayıp yağda kavurun. Domatesleri ekleyin. " +
      "Suyunu çekince yumurtaları kırıp karıştırın. " +
      "Tuz ekleyip 2-3 dakika daha pişirin.",
  },
  {
    id: "2",
    isim: "Makarna",
    sure: 25,
    kategori: "Ana Yemek",
    malzemeler: ["250g Makarna", "Su", "Tuz", "Salça", "Sıvı Yağ"],
    yapilis:
      "Suyu kaynatıp makarnayı haşlayın. " +
      "Ayrı tavada yağda salçayı kavurun. " +
      "Süzülen makarnayı sosla karıştırın.",
  },
  {
    id: "3",
    isim: "Tost",
    sure: 10,
    kategori: "Kahvaltı",
    malzemeler: ["2 Dilim Ekmek", "Kaşar Peyniri", "Domates", "Tereyağı"],
    yapilis:
      "Ekmeklerin arasına kaşar ve domates dilimlerini koyun. " +
      "Tost makinesinde veya tavada her iki tarafını kızartın.",
  },
  {
    id: "4",
    isim: "Yumurtalı Patates",
    sure: 30,
    kategori: "Kahvaltı",
    malzemeler: ["3 Patates", "3 Yumurta", "Tuz", "Karabiber", "Sıvı Yağ"],
    yapilis:
      "Patatesleri küp küp doğrayıp yağda kızartın. " +
      "Üzerine yumurtaları kırıp karıştırın. " +
      "Tuz ve karabiber ekleyip pişirin.",
  },
  {
    id: "5",
    isim: "Omlet",
    sure: 10,
    kategori: "Kahvaltı",
    malzemeler: ["3 Yumurta", "Tuz", "Karabiber", "Tereyağı", "Maydanoz"],
    yapilis:
      "Yumurtaları kase içinde çırpın. Tuz ve karabiber ekleyin. " +
      "Tavada tereyağını eritip yumurtaları dökün. " +
      "Altı pişince katlayın, maydanoz serpin.",
  },
  {
    id: "6",
    isim: "Mercimek Köftesi",
    sure: 60,
    kategori: "Atıştırmalık",
    malzemeler: [
      "2 su bardağı yeşil mercimek",
      "1 adet patates",
      "2 adet havuç",
      "1 adet kuru soğan",
      "1 tatlı kaşığı tuz",
      "4 su bardağı su",
      "1 adet yumurta",
      "1,5 su bardağı galeta unu"
    ],
    yapilis: "Sebzeleri haşlayın, mercimekle karıştırıp ezin. Harç soğuyunca köfte şekli verin."
  },
  {
    id: "7",
    isim: "Mercimek Çorbası",
    sure: 35,
    kategori: "Çorba",
    malzemeler: ["1 su bardağı kırmızı mercimek", "1 soğan", "1 havuç", "1 patates", "Su", "Tuz"],
    yapilis: "Soğanları kavurun, mercimek ve sebzeleri ekleyin. Haşlayıp blenderdan geçirin."
  },
  {
    id: "8",
    isim: "Köfte",
    sure: 40,
    kategori: "Ana Yemek",
    malzemeler: ["500g Kıyma", "1 Soğan", "Ekmek içi", "Baharatlar"],
    yapilis: "Tüm malzemeleri yoğurup şekil verin. Tavada veya fırında pişirin."
  },
  {
    id: "9",
    isim: "Sütlaç",
    sure: 45,
    kategori: "Tatlı",
    malzemeler: ["1 litre süt", "1 çay bardağı pirinç", "1 su bardağı şeker", "Nişasta"],
    yapilis: "Pirinçleri haşlayın, süt ve şekeri ekleyip kaynatın. Nişasta ile kıvam aldırın."
  }
];

export default tarifler;
