---
trigger: on_demand
---

# 🗄️ Database Rules - Supabase & Drizzle

### 🏗️ Architecture
- **ID Strategy**: Gunakan `uuid` (v4) sebagai primary key secara default untuk keamanan dan skalabilitas di Supabase.
- **Naming Convention**: 
    - Database: `snake_case` (e.g., `customer_id`).
    - Drizzle: `camelCase` (e.g., `customerId`).
- **Timestamps**: Wajib menyertakan `created_at` dan `updated_at` di setiap tabel menggunakan `timestamp` dengan `withTimezone: true`.
- **Naming Files**: Schema dipisah per fitur jika sudah terlalu besar, atau dalam satu `db/schema.ts` yang terorganisir.

### 🔐 Supabase & Security
- **RLS (Row Level Security)**: Selalu asumsikan RLS aktif. Pastikan query dari Server Components atau Actions menggunakan service role jika memang bypass, atau client-side auth jika user-facing.
- **Indexes**: Tambahkan index pada kolom yang sering digunakan untuk filtering atau join (e.g., `status`, `customer_id`).
- **Delete Strategy**: Gunakan `deleted_at` (soft delete) untuk data transaksi krusial.

### 🔌 Connection
- **Pooling**: Gunakan port `6543` (Transaction Mode) untuk deployment di Vercel agar tidak menghabiskan koneksi Supabase.
- **SSL**: Pastikan koneksi aman.

### 🛠️ Drizzle Best Practices
- **Strict Types**: Definisikan tipe `inferSelect` dan `inferInsert` untuk setiap tabel.
- **Relations**: Gunakan API `relations` dari Drizzle untuk mempermudah join yang kompleks.
- **Migrations**: Gunakan `drizzle-kit` untuk semua perubahan schema. Dilarang mengubah DB langsung dari dashboard Supabase secara manual.

### ⚡ Activation Mode: Demand-Driven
- Saya hanya akan mengakses/memodifikasi database ketika ada request fitur yang membutuhkan persistensi data.
- Tidak melakukan auto-sync schema kecuali diperintah atau saat deploy migrasi baru.
