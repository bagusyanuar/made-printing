---
trigger: on_demand
---

# 🏗️ Backend Rules - Supabase & Drizzle

### 🗄️ Database Architecture
- **ID Strategy**: Gunakan `uuid` (v4) sebagai primary key secara default.
- **Naming**: Database `snake_case`, Drizzle `camelCase`.
- **Timestamps**: Wajib `created_at`, `updated_at`, dan `deleted_at` (soft delete) dengan `withTimezone: true`.

### 🔐 Security & Auth
- **RLS**: Selalu asumsikan RLS aktif.
- **Service Role**: Gunakan `SUPABASE_SERVICE_ROLE_KEY` hanya di layer server yang membutuhkan bypass admin.
- **Validation**: Wajib menggunakan **Zod** untuk validasi input di Server Actions/API.

### 🔌 Connection & ORM
- **Pooling**: Gunakan port `6543` untuk deployment.
- **Drizzle**: 
    - Split schema per file di `db/schemas/`.
    - Gunakan `db/schema.ts` sebagai aggregator.
    - Dilarang keras menggunakan `any` pada query result.

### ⚙️ Logic Layer
- **Server Actions**: Gunakan Server Actions untuk mutasi data.
- **Error Handling**: Kembalikan object terstruktur `{ data, error }` agar mudah dihandle di FE.
