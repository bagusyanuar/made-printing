---
trigger: always_on
---

# 💎 Coding Standards - Clean, DRY, Optimize, Robust (CDOR)

### 🧹 Clean Code
- **Naming**: Gunakan nama variabel, fungsi, dan komponen yang deskriptif. (e.g., `getTransactionById` bukan `getData`).
- **Structure**: Pisahkan logika bisnis dari UI (pake hooks atau server actions).
- **Comments**: Berikan komentar pada logika yang kompleks atau konfigurasi khusus (seperti pooling DB).

### ♻️ DRY (Don't Repeat Yourself)
- **Utilities**: Fungsi yang dipakai lebih dari 2x wajib masuk ke `lib/utils` atau folder helper terkait.
- **Constants**: Hindari hardcoded string/value. Gunakan file konstanta atau enum.
- **Components**: Pecah UI menjadi atomik komponen yang reusable.

### 🚀 Optimize
- **Database**: Gunakan select kolom yang dibutuhkan saja (hindari `select *`).
- **Next.js**: Manfaatkan Server Components secara maksimal. Gunakan `Suspense` untuk loading state yang granular.
- **Assets**: Pastikan image menggunakan `next/image` dan font sudah di-optimize.

### 🛡️ Robust
- **Type Safety**: DILARANG keras menggunakan `any`. Gunakan TypeScript Interface/Type yang ketat.
- **Error Handling**: Setiap operasi I/O (DB, API) wajib dibungkus `try-catch` atau `result pattern` dan memberikan feedback user-friendly.
- **Defensive Coding**: Selalu validasi environment variables dan input data (pakai Zod).
- **Singletons**: Gunakan pattern singleton untuk resource terbatas seperti database connection.
