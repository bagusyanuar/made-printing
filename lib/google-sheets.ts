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
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive"
    ],
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

/**
 * Helper to create a new spreadsheet inside a folder
 */
export async function createSpreadsheet(title: string, folderId?: string) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY_BASE64 
        ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, "base64").toString("utf8")
        : undefined,
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive"
    ],
  });

  const drive = google.drive({ version: "v3", auth });
  
  try {
    const response = await drive.files.create({
      requestBody: {
        name: title,
        mimeType: "application/vnd.google-apps.spreadsheet",
        parents: folderId ? [folderId] : undefined,
      },
    });
    
    const spreadsheetId = response.data.id;
    return { 
      success: true, 
      spreadsheetId, 
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit` 
    };
  } catch (error) {
    console.error("Google Drive Create Error:", error);
    return { success: false, error };
  }
}

/**
 * Helper to create a new tab (sheet) inside a spreadsheet
 */
export async function createNewTab(spreadsheetId: string, title: string) {
  const sheets = await getGoogleSheetsClient();
  
  try {
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
              },
            },
          },
        ],
      },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Google Sheets Add Tab Error:", error);
    return { success: false, error };
  }
}
