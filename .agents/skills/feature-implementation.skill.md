# 🛠️ Skill: Feature Implementation Workflow

Gunakan skill ini setiap kali membuat fitur baru yang melibatkan database dan UI.

### 1. Database Design (DBML)
- Update `docs/dbml/[feature].schema.dbml`.
- Brainstorming kolom dan relasi dengan user.
- Pastikan mengikuti `backend-rules.md`.

### 2. Drizzle Schema
- Buat file schema baru di `db/schemas/[feature].ts`.
- Export di `db/schema.ts`.
- Jalankan `npx drizzle-kit push` untuk sinkronisasi ke Supabase.

### 3. Logic Layer (Server Actions)
- Buat folder `app/actions/[feature]/`.
- Implementasi fungsi CRUD menggunakan Drizzle `db`.
- Wajib pakai **Zod** untuk validasi input.
- Return format: `{ data: T | null, error: string | null }`.

### 4. UI Components
- Buat base components di `components/ui/` jika belum ada (pake CVA/Clsx).
- Buat feature components di `components/features/[feature]/`.
- Implementasi Page/Route di `app/[feature]/`.

### 5. Verification
- Test input data.
- Cek feedback visual (Toast/Alert).
- Pastikan responsive (Mobile First).
