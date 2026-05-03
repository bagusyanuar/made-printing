"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { testGoogleSheets } from "./actions";
import { FileSpreadsheet, Send } from "lucide-react";

export default function GoogleSheetsSample() {
  const [spreadsheetId, setSpreadsheetId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleTest = async () => {
    if (!spreadsheetId) {
      toast.error("Masukkan Spreadsheet ID dulu Bosku!");
      return;
    }

    setLoading(true);
    try {
      const res = await testGoogleSheets(spreadsheetId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-8">
      <div className="space-y-2 text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4">
          <FileSpreadsheet className="text-green-600 dark:text-green-400 size-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Google Sheets Tester</h1>
        <p className="text-zinc-500">Tes koneksi Server Action ke Google Sheets API.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sheet-id">Spreadsheet ID</Label>
            <TextField 
              id="sheet-id"
              placeholder="Paste ID spreadsheet lu di sini..."
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
            />
            <p className="text-[11px] text-zinc-500">
              Contoh: <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms</code>
            </p>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-700/50 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
            <p className="font-bold text-zinc-900 dark:text-zinc-100">PENTING:</p>
            <p>1. Pastikan Sheet lu sudah di-share ke email service account kita.</p>
            <p>2. Pastikan ada sheet bernama <code className="font-bold">Sheet1</code> (Default).</p>
          </div>
        </div>

        <Button 
          onClick={handleTest} 
          loading={loading}
          className="w-full h-12 rounded-2xl bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20"
        >
          <Send className="mr-2 size-4" /> Kirim Data Test
        </Button>
      </div>
    </div>
  );
}
