/*
SEZR MATEMATİK KOLAY İÇERİK DOSYASI

Bu dosyadan site içeriklerini kolayca değiştirebilirsin.
Sadece tırnak içindeki yazıları değiştirmen yeterli.
*/

const siteIcerikleri = {
  duyurular: [
    "🔥 2026 Yaz Dönemi Ön Kayıtları Başladı",
    "👥 Kontenjan Sınırlıdır",
    "💬 Program Bilgisi İçin WhatsApp’tan Yazın"
  ],

  dersler: [
    {
      icon: "👤",
      baslik: "Birebir Ders",
      aciklama: "Kişiye özel planlama ve takip sistemi.",
      link: "#iletisim",
      buton: "Bilgi Al"
    },
    {
      icon: "👥",
      baslik: "Grup Dersleri",
      aciklama: "Takipli ve aktif katılımlı çalışma ortamı.",
      link: "#iletisim",
      buton: "Bilgi Al"
    },
    {
      icon: "📖",
      baslik: "9-10. Sınıf",
      aciklama: "Temel güçlendirme ve yeni nesil soru çözümü.",
      link: "#iletisim",
      buton: "Bilgi Al"
    },
    {
      icon: "🔥",
      baslik: "Büyük Dertler",
      aciklama: "Limit, türev, integral ve trigonometri özel paketi.",
      link: "#iletisim",
      buton: "Bilgi Al"
    },
    {
      icon: "🧠",
      baslik: "Problemler",
      aciklama: "Problem çözme mantığı geliştirme çalışmaları.",
      link: "#iletisim",
      buton: "Bilgi Al"
    }
  ],

  gununSorusu: {
    baslik: "💡 Günün Matematik Sorusu",
    soru: "<b>Soru:</b> f(x) = x³ - 3x + 2 fonksiyonu için f'(x) türev fonksiyonunu bulunuz.",
    secenekler: [
      "A) 3x² - 3",
      "B) 3x² + 3",
      "C) 3x² - 3x",
      "D) x² - 3"
    ],
    cevap: "<b>Doğru cevap: A) 3x² - 3</b><br>Çünkü x³ ifadesinin türevi 3x², -3x ifadesinin türevi -3, sabit olan +2’nin türevi ise 0’dır."
  },

  pdfler: [
    {
      icon: "📘",
      baslik: "9. Sınıf",
      aciklama: "Temel kavramlar ve yeni döneme hazırlık çalışma notları.",
      link: "pdfler/9-sinif-calisma.pdf",
      buton: "PDF Aç"
    },
    {
      icon: "📗",
      baslik: "10. Sınıf",
      aciklama: "Fonksiyonlar, polinomlar ve temel güçlendirme içerikleri.",
      link: "pdfler/10-sinif-calisma.pdf",
      buton: "PDF Aç"
    },
    {
      icon: "🔥",
      baslik: "Büyük Dertler",
      aciklama: "Limit, türev, integral ve trigonometri konu notları.",
      link: "pdfler/buyuk-dertler.pdf",
      buton: "PDF Aç"
    },
    {
      icon: "🧠",
      baslik: "Problemler",
      aciklama: "Problem çözme mantığını geliştiren çalışma kağıtları.",
      link: "pdfler/problemler.pdf",
      buton: "PDF Aç"
    }
  ],

  videolar: [
    {
      icon: "▶",
      baslik: "Limit Nedir?",
      aciklama: "Temelden limit konu anlatımı. Gerçek video linkini buraya ekleyebilirsin.",
      link: "https://youtube.com/@SezRmatematik",
      buton: "İzle"
    },
    {
      icon: "▶",
      baslik: "Türev Mantığı",
      aciklama: "Formül ezberi yerine mantık kurma.",
      link: "https://youtube.com/@SezRmatematik",
      buton: "İzle"
    },
    {
      icon: "▶",
      baslik: "Problemler",
      aciklama: "Soru tipi tanıma ve çözüm planı.",
      link: "https://youtube.com/@SezRmatematik",
      buton: "İzle"
    },
    {
      icon: "▶",
      baslik: "Trigonometri Tekrarı",
      aciklama: "En çok karıştırılan trigonometri noktaları.",
      link: "https://youtube.com/@SezRmatematik",
      buton: "İzle"
    }
  ],

  panel: [
    {
      icon: "📄",
      baslik: "PDF Notlar",
      aciklama: "Konu özetleri ve çalışma kağıtları.",
      link: "#pdf",
      buton: "PDF Alanı"
    },
    {
      icon: "📝",
      baslik: "Mini Testler",
      aciklama: "Kısa testlerle kendini dene.",
      link: "#soru",
      buton: "Teste Git"
    },
    {
      icon: "▶",
      baslik: "Videolar",
      aciklama: "Seçilmiş ders videoları.",
      link: "#youtube",
      buton: "Videolar"
    },
    {
      icon: "✅",
      baslik: "Ödev Takibi",
      aciklama: "Haftalık çalışma planı ve ödevler.",
      link: "#",
      buton: "Yakında"
    }
  ],

  yorumlar: [
    {
      ad: "Efe",
      sinif: "10. Sınıf",
      yorum: "Matematikten korkuyordum ama artık sorulara nasıl yaklaşacağımı biliyorum."
    },
    {
      ad: "Zeynep",
      sinif: "TYT Öğrencisi",
      yorum: "Problemler konusunda ciddi gelişme sağladım."
    },
    {
      ad: "Ahmet",
      sinif: "12. Sınıf",
      yorum: "Limit ve türev artık daha anlaşılır geliyor."
    }
  ]
};
