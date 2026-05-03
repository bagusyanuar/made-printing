"use server";

import { appendToSheet } from "@/lib/google-sheets";

export async function testGoogleSheets(spreadsheetId: string) {
  if (!spreadsheetId) return { error: "Spreadsheet ID wajib diisi" };

  const dummyData = [
    ["Timestamp", "Kategori", "Status", "Pesan"],
    [new Date().toISOString(), "Sample Test", "Success", "Halo Bosku, ini tes dari aplikasi!"],
  ];

  const result = await appendToSheet(spreadsheetId, "Sheet1!A1", dummyData);

  if (result.success) {
    return { success: true, message: "Data berhasil dikirim ke Google Sheets!" };
  } else {
    return { error: "Gagal mengirim data. Cek logs server atau permission sheet." };
  }
}
