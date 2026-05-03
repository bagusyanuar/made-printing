# Phase 2: Master Data Management

## 🎯 Goal
Mengimplementasikan manajemen data master (Categories, Materials, Products) sebagai fondasi utama aplikasi transaksi.

## 🛠️ Tasks

### 1. Database & Schema
- [x] Implementasi Drizzle schema untuk `categories`.
- [ ] Implementasi Drizzle schema untuk `materials`.
- [ ] Implementasi Drizzle schema untuk `products` & `product_materials`.
- [x] Generate & Run Migrations (Supabase).

### 2. Feature: Categories (CRUD)
- [x] Server Actions: `getCategories`, `createCategory`, `updateCategory`, `deleteCategory` (Soft Delete).
- [ ] UI: Halaman list kategori dengan search.
- [ ] UI: Modal/Halaman tambah & edit kategori.

### 3. Feature: Materials (CRUD)
- [ ] Server Actions: `getMaterials`, `createMaterial`, `updateMaterial`, `deleteMaterial`.
- [ ] UI: Halaman list bahan dengan indikator stok & harga per unit.
- [ ] UI: Form management bahan.

### 4. Feature: Products (CRUD)
- [ ] Server Actions: `getProducts`, `createProduct`, `updateProduct`, `deleteProduct`.
- [ ] Logic: Integrasi pemilihan banyak bahan untuk satu produk.
- [ ] UI: Halaman list produk.
- [ ] UI: Form product builder (pilih kategori & link ke bahan).

## 🏛️ Architecture Decisions
- **Feature-Based**: Kode dipisah ke `features/categories/`, `features/materials/`, dst.
- **Soft Delete**: Semua aksi delete menggunakan `deleted_at` untuk keamanan data.
- **Server Actions as Use Cases**: Logic bisnis (validasi Zod + DB operation) ada di Server Actions.
- **UI Consistency**: Menggunakan komponen yang sudah ada (`TextField`, `Alert`, `Button`) dengan desain Zinc.

---
**Status**: Ready for Review.
