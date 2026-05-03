# Phase 1: Authentication & User Management

## 🎯 Goal
Implementasi sistem autentikasi yang aman dan modular menggunakan Supabase Auth terintegrasi dengan Drizzle ORM dan Next.js Server Actions.

## 🏗️ Architecture (Feature-Based)
Semua logic auth akan dikumpulkan di dalam folder `features/auth`.

- `features/auth/actions.ts`: Server Actions untuk Login, Register, Logout, dan Reset Password.
- `features/auth/components/`: UI khusus auth (LoginForm, RegisterForm, dll).
- `features/auth/schemas.ts`: Zod validation untuk input data.
- `features/auth/types.ts`: Interface dan Type khusus auth.

## 📝 Tasks

### 1. Database & Schema
- [x] Definisikan Drizzle schema untuk tabel `users` (id, username, password, is_active, timestamps) sesuai DBML.
- [x] Setup migration untuk create tabel `users` di public schema.

### 2. Validation (Zod)
- [x] Schema untuk Login (`username`, `password`).
- [x] Schema untuk Register (`username`, `password`).

### 3. Server Actions Logic
- [x] `signInWithUsername`: Handling login menggunakan username & password validation.
- [x] `signUpWithUsername`: Handling registrasi user baru ke tabel `users`.
- [x] `signOut`: Handling clear session.
- [x] Error handling: Cek `is_active` status sebelum izinkan login.

### 4. Middleware & Protection
- [x] Setup `middleware.ts` untuk memproteksi route `/dashboard` dan redirect tamu ke `/login`.
- [x] Setup redirect otomatis jika user sudah login tapi akses `/login`.

### 5. UI Integration
- [x] Hubungkan `LoginForm.tsx` dengan `signInWithUsername` action.
- [x] Tambahkan loading state dan toast notification (Success/Error).

## 🚀 Next Step
Setelah dokumen ini oke, kita mulai dari **Task 1: Database & Schema**.
