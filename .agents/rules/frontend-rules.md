---
trigger: always_on
---

# 🎨 Frontend Rules - Next.js & Tailwind v4

### 🧩 Component Architecture
- **Shadcn Style (Manual)**: Bangun komponen UI reusable menggunakan `cva`, `clsx`, dan `tailwind-merge`.
- **Atomic Design & Granular Structure**: 
    - `components/ui/[name]/`: Setiap base component wajib dipisah ke dalam folder.
        - `[Name].tsx`: Komponen utama.
        - `[name].variants.ts`: Definisi `cva` variants.
        - `index.ts`: Export aggregator.
    - `components/features/[feature]/`: Komponen spesifik fitur.
- **Client vs Server**: Prioritaskan **Server Components**. Gunakan `'use client'` hanya jika ada interaksi (onClick, useEffect, state).

### 💅 Styling (Tailwind CSS v4)
- **Utilities**: Hindari inline style yang terlalu panjang, gunakan class composition.
- **Variants**: Gunakan `class-variant-authority` (CVA) untuk menghandle state visual (disabled, active, variants).
- **Helper**: Selalu gunakan helper `cn()` untuk penggabungan class.

### ⚡ Performance & UX
- **Loading State**: Gunakan `Suspense` dan `loading.tsx` untuk granular loading.
- **Feedback**: Wajib memberikan feedback visual (Toast/Alert) untuk setiap aksi user.
- **Form Handling**: Gunakan `react-hook-form` jika form sudah kompleks, dipadukan dengan Zod.

### 📱 Responsive Design
- Gunakan pendekatan Mobile-First.
- Pastikan UI nyaman digunakan di berbagai ukuran layar.
