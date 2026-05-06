### 📄 `frontend-specs.md` (Untuk Agent FE)

# Frontend Technical Specs: Dynamic Order Form

## 1. Objective

Membuat form pemesanan dinamis yang berubah secara reaktif berdasarkan Unit of Measurement (UoM) produk dan menghitung estimasi harga secara real-time.

## 2. Tech Stack & Rules

- **Framework**: Vue 3 (Composition API).
- **Styling**: Tailwind CSS v4.
- **State Management**: Pinia.
- **Validation**: Zod (wajib untuk form validation).
- **Architecture**: Modular Monorepo (pnpm/Turborepo). Jaga Tree-Shaking 100% (Gunakan Direct Import untuk Use Cases/Composables).
- **Strictness**: **NO `any`**.

## 3. UI/UX Flow

- **Product Selection**: User memilih kategori dan produk.
- **Dynamic Fields**:
  - Jika `product.uom === 'm2'`: Tampilkan Input `Panjang (cm)` dan `Lebar (cm)`.
  - Jika `product.uom === 'm_lari'`: Tampilkan Input `Panjang (cm)` saja.
  - Jika `product.uom === 'pcs'`: Sembunyikan input dimensi, tampilkan `Quantity` saja.
- **Real-time Preview**: Setiap perubahan input memicu fungsi debounced untuk hitung harga ke BE atau local logic.

## 4. Component Structure

- `OrderForm.vue`: Wrapper utama.
- `DimensionInput.vue`: Input khusus PxL dengan validasi angka.
- `PriceSummary.vue`: Menampilkan breakdown harga (Harga Satuan vs Tier yang didapat).

## 5. Logic Implementation

- **Schema Validation**: Gunakan Zod untuk memastikan input dimensi tidak nol dan qty minimal 1.
- **UoM Handling**:
  ```typescript
  const calculateTotalUnit = (
    uom: string,
    p: number,
    l: number,
    qty: number,
  ): number => {
    if (uom === "m2") return (p / 100) * (l / 100) * qty;
    if (uom === "m_lari") return (p / 100) * qty;
    return qty;
  };
  ```

```

```
