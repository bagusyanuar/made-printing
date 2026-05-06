content = """# Detailed Backend Specifications: Printing ERP Pricing & Order Engine

## 1. Project Overview & Architectural Principles

Sistem ini adalah mesin inti (core engine) untuk ERP Percetakan yang mengelola perhitungan harga dinamis, manajemen produk berbasis varian, dan integrasi multi-level customer.

### Core Rules (Non-Negotiable)

- **Language/Framework**: Golang (Clean Architecture) atau Laravel (Hexagonal Architecture).
- **Database**: PostgreSQL (Relational integrity is priority).
- **Type Safety**: **STRICT**. Penggunaan `any` atau `interface{}` tanpa tipe yang jelas dilarang keras.
- **Precision**: Gunakan `Numeric/Decimal` untuk semua nilai uang dan dimensi. **DILARANG** menggunakan `Float`.
- **Architecture**: Core business logic (Pricing Engine) harus murni (pure functions) dan terpisah dari framework/delivery mechanism.

---

## 2. Detailed Data Domain (Entity Map)

### A. Product & Variant Management

Sistem menggunakan pola **Product-Variant-Attribute** untuk menangani variasi bahan yang luas (seperti di Price List 2026).

- **Category**: (A3+, MMT, Indoor, Stand).
- **Product**: Bahan dasar (e.g., "Art Paper 150"). Memiliki `uom` (Unit of Measurement: `pcs`, `m2`, `m_lari`).
- **Variant**: Hasil kombinasi bahan + spek (e.g., "Art Paper 150 - 2 Sisi").
- **Attribute**: Nama spek (e.g., "Laminasi", "Sisi").
- **AttributeValue**: Nilai spek (e.g., "Glossy", "1 Sisi").

### B. Customer & Pricing Tier

- **CustomerLevel**: Klasifikasi (Regular, Reseller, Agen).
- **PriceTier**: Aturan harga berjenjang.
  - `min_qty` & `max_qty`: Batas kuantitas (bisa desimal untuk `m2`).
  - `price_per_unit`: Harga dasar per unit pada tier tersebut.

---

## 3. The Pricing Engine Algorithm (Deep Dive)

Aplikasi harus mengimplementasikan pipeline kalkulasi sebagai berikut:

### Phase 1: Input Normalization

Konversi semua input dimensi ke satuan standar (`meter` atau `pcs`).

- Jika `UoM == 'm2'`: `total_unit = (panjang_cm / 100) * (lebar_cm / 100) * qty`.
- Jika `UoM == 'm_lari'`: `total_unit = (panjang_cm / 100) * qty`.
- Jika `UoM == 'pcs'`: `total_unit = qty`.

### Phase 2: Business Logic Rules

1. **Minimum Billing**:
   - Jika `UoM == 'm2'` dan `total_unit < 1.0`, maka `total_unit = 1.0` (Minimal bayar 1 meter).
2. **Minimal Payment (Services)**:
   - Seperti Jasa Jahit: Jika `total_unit * price < 6000`, maka `total_price = 6000`.

### Phase 3: Tier Lookup

Lakukan query ke tabel `price_tiers`:

---

### Analisis Tambahan untuk Kamu (Senior Analyst):

1.  **Backend Focus**: Saya menekankan penggunaan `Decimal` daripada `Float`[cite: 6, 12, 19]. Di PDF-mu, harga-harganya bulat, tapi begitu masuk ke perhitungan `m2` (misal: 1.25m x 0.8m), angka desimal akan krusial.
2.  **Frontend Focus**: Karena kamu pakai **Tailwind 4**, ingatkan agent untuk tidak menggunakan konfigurasi `tailwind.config.js` lama jika mereka mencoba melakukan kustomisasi, karena v4 lebih berbasis CSS variables.
3.  **Monorepo Safety**: Sesuai _Saved Info_-mu mengenai _Barrel Files_, saya sudah selipkan instruksi di FE specs agar tetap menggunakan **Direct Import** untuk folder `usecases` dan `composables` supaya Tree-Shaking Vite tetap 100%.

Kira-kira ada modul lain seperti **Inventory/Stok Bahan** atau **Manajemen Antrian Mesin** yang mau dibuatkan specs-nya sekalian, bro?
