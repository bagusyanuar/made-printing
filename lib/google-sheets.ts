import { google } from "googleapis";

/**
 * Initialize Google Sheets API Client
 */
export async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY_BASE64 
        ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, "base64").toString("utf8")
        : undefined,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

/**
 * Type for Spreadsheet Cell Values
 */
export type SheetCellValue = string | number | boolean | null | undefined;

/**
 * Helper to append data to a sheet
 */
export async function appendToSheet(spreadsheetId: string, range: string, values: SheetCellValue[][]) {
  const sheets = await getGoogleSheetsClient();
  
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Google Sheets Error:", error);
    return { success: false, error };
  }
}
