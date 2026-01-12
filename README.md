# RFM Müşteri Segmentasyon Uygulaması

## Canlı Demo

🚀 **[https://com-digital-task.vercel.app/](https://com-digital-task.vercel.app/)**

## Genel Bakış

RFM (Recency-Frequency-Monetary) analizi yaparak müşteri segmentasyonunu görsel bir grid arayüzü üzerinde gösteren React ve Next.js uygulaması. Müşterileri satın alma davranışlarına göre sınıflandırıp analiz edebilirsiniz.

## Özellikler

- **5×5 Grid Arayüzü**: Müşteri segmentlerini 2D grid üzerinde görselleştir
- **RFM Skor Hesaplaması**: Otomatik RFM skorlaması (1-5 skala)
- **Gelişmiş Filtreleme**: Müşterileri Recency, Frequency ve Monetary aralıklarına göre filtrele
- **İnteraktif Seçim**: Tek tıkla seç/bırak veya toplu seçim yap
- **API Entegrasyonu**: Seçilen müşteri ID'lerini API'ye gönder
- **Mock API**: Test için hazırlanmış API uç noktası
- **Duyarlı Tasarım**: Tüm cihazlarda uyumlu arayüz
- **TypeScript Desteği**: Tip güvenliğiyle yazılmış kod

## Proje Yapısı

```
rfm-segmentation/
├── public/
│   └── data.json                 # 100+ müşteri verisi
├── src/
│   ├── app/
│   │   ├── page.tsx             # Ana sayfa
│   │   ├── layout.tsx           # Layout
│   │   └── api/
│   │       └── selected-ids/
│   │           └── route.ts     # API uç noktası
│   ├── components/
│   │   └── RFMGrid.tsx          # Grid bileşeni
│   ├── utils/
│   │   └── rfmCalculator.ts     # RFM hesaplama
│   └── globals.css              # Global stiller
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## Veri Yapısı

### Giriş Verileri (data.json)

Her müşteri kaydı şunları içerir:

```json
{
  "id": 1,
  "recency": 2,
  "frequency": 45,
  "monetary": 5420.50
}
```

- **id**: Müşteri kimliği
- **recency**: Son satın almadan geçen gün sayısı
- **frequency**: Yapılan satın alma sayısı
- **monetary**: Toplam harcama miktarı

### RFM Skorları

Her dimension için 1-5 arasında puan verilir:
- **Recency Score**: 1-5 (5 = en yakın zamanda)
- **Frequency Score**: 1-5 (5 = en sık satın alan)
- **Monetary Score**: 1-5 (5 = en yüksek harcama)

Grid konumlandırması:
- **X ekseni**: Frequency Score
- **Y ekseni**: Monetary Score

## Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

1. **Proje dizinine giderek:**

```bash
cd rfm-segmentation
```

2. **Bağımlılıkları yükle:**

```bash
npm install
```

3. **Geliştirme sunucusunu başlat:**

```bash
npm run dev
```

4. **Tarayıcıdan aç:**

[http://localhost:3000](http://localhost:3000) adresine git

## Kullanım

### 1. Grid'i Görüntüle

5×5 grid açıldığında:
- Her hücre müşteri kartlarını gösterir
- Her kart ID, Frequency ve Monetary değerlerini içerir
- Kartlara tıklayarak seçim yapabilirsin

### 2. Filtrele

Kaydırıcıları kullanarak filtrele:
- **Recency Score**: Son satın alma zamanına göre
- **Frequency Score**: Satın alma sıklığına göre
- **Monetary Score**: Harcama miktarına göre

Grid otomatik olarak güncellenir.

### 3. Müşteri Seç

- **Tekil Seçim**: Kartlara tıklayarak seç/bırak
- **Tümünü Seç**: Filtrelenmiş tüm müşterileri seç
- **Seçimi Kaldır**: Seçimleri temizle

### 4. API'ye Gönder

- **Submit** butonuna tıkla
- Seçilen müşteri ID'leri `/api/selected-ids` adresine gönderilir
- Onay mesajı görürüsün

## API Uç Noktası

### POST /api/selected-ids

Seçilen müşteri ID'lerini gönder.

**İstek:**
```json
{
  "selectedIds": [1, 5, 15, 23, 45]
}
```

**Yanıt:**
```json
{
  "success": true,
  "message": "5 müşteri başarıyla işlendi",
  "selectedIds": [1, 5, 15, 23, 45],
  "timestamp": "2026-01-12T17:45:30.000Z",
  "processingTime": "125ms"
}
```

## Teknik Detaylar

### RFM Hesaplaması (`src/utils/rfmCalculator.ts`)

- `calculateRFMScores()`: Tüm müşteriler için skor hesapla
- `percentileToScore()`: Yüzdelik dilimi 1-5 skalasına çevir
- `filterRFMScores()`: Filtreleme işlemini yap
- `getGridLabel()`: Skor etiketini getir

## Teknoloji Yığını

- **Next.js 16.1.1**: React framework
- **TypeScript 5**: Tip güvenliği
- **Tailwind CSS**: Stil yönetimi
- **React 19**: UI library

## Üretim İçin Hazırlama

```bash
npm run build
npm run start
```

## Verileri Özelleştirme

`public/data.json` dosyasını düzenleyerek kendi verilerinizi ekleyebilirsiniz. Aynı yapıyı korumayı unutmayın:

```json
{
  "id": number,
  "recency": number,
  "frequency": number,
  "monetary": number
}
```

## Grid Boyutunu Değiştirme

`src/components/RFMGrid.tsx` dosyasındaki döngüleri düzenle:

```typescript
for (let y = 5; y >= 1; y--) {      // 5'i değiştir
  for (let x = 1; x <= 5; x++) {   // 5'i değiştir
```

## Sorun Giderme

### Veri Yüklenmiyorsa
- `public/data.json` dosyasının var olduğunu kontrol et
- JSON formatını doğrula
- Tarayıcı konsoluna bak

### API Hatası Veriyorsa
- `/api/selected-ids` uç noktasının mevcut olduğunu kontrol et
- Tarayıcı Network sekmesini kontrol et
- İstek formatını doğrula
