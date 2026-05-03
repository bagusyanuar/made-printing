"use server";

import { appendToSheet, createSpreadsheet, createNewTab } from "@/lib/google-sheets";

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

export async function createTestSheet() {
  const title = `Laporan Made Printing - ${new Date().toLocaleDateString()}`;
  const FOLDER_ID = "1wltr1_i2cxmoXBahRT027R7IpHLEvL8M";
  const result = await createSpreadsheet(title, FOLDER_ID);

  if (result.success) {
    return { 
      success: true, 
      message: "Sheet baru berhasil dibuat!", 
      url: result.url,
      spreadsheetId: result.spreadsheetId 
    };
  } else {
    return { error: "Gagal membuat sheet baru." };
  }
}

export async function createTestTab(spreadsheetId: string) {
  if (!spreadsheetId) return { error: "Spreadsheet ID wajib diisi" };
  
  const title = `Tab ${new Date().toLocaleTimeString().replace(/:/g, "-")}`;
  const result = await createNewTab(spreadsheetId, title);

  if (result.success) {
    return { success: true, message: `Tab "${title}" berhasil dibuat!` };
  } else {
    return { error: "Gagal membuat tab baru. Cek apa nama tab sudah ada." };
  }
}
