# SezR Matematik YouTube Video Yönetimi

Videolar `icerikler.js` dosyasından düzenlenir.

## Video nasıl eklenir?

`icerikler.js` içinde şu bölümü bul:

```js
videolar: [
```

Örnek video kartı:

```js
{
  icon: "▶",
  baslik: "Limit Nedir?",
  aciklama: "Temelden limit konu anlatımı.",
  link: "https://youtube.com/@SezRmatematik",
  buton: "İzle"
}
```

## Gerçek video linki nasıl koyulur?

YouTube videosunu aç.
Paylaş butonuna bas.
Linki kopyala.

Sonra `link` kısmına yapıştır.

Örnek:

```js
link: "https://www.youtube.com/watch?v=VIDEO_ID",
```

## Dikkat

Virgülleri silme.
Tırnak işaretlerini bozma.
Her kartın sonunda virgül olabilir.
