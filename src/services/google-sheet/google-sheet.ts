import path from "path";
import process from "process";
import { google, sheets_v4 } from "googleapis";
//import { UserType } from "../types";
//import { userStore } from "./user-store";
import { GoogleAuth } from "google-auth-library";

// THIS STORE USE THE NATIVE GOOGLE SPREADSHEET API

type Table = string[][] | null;

export class GoogleSheet {
 // readonly SPREADSHEET_ID = "1E3ck2MrItc11UaO4GzfIRwT7qNTTPOazabQ0csA3t9A";
  readonly BASE_SPREASHEET_ID = "1mu33CWRWH27u4VXrhoXDEgw0bEC2nXy37eLxZGKM_Xg";
  //private spreadsheetId: string;
  private readonly TABLE_SIZE = 250;
  private readonly SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
  private readonly service: sheets_v4.Sheets;

  constructor() {
    this.authenticate();
   /// this.spreadsheetId = spreadsheetId ?? "1E3ck2MrItc11UaO4GzfIRwT7qNTTPOazabQ0csA3t9A";
    this.service = google.sheets("v4");
  }

  // private async createNewTable(): Promise<void> {
  //   const resource = {
  //     properties: {
  //       title: "my new spreadsheet",
  //     },
  //   } as sheets_v4.Schema$Spreadsheet;

  // const spreadsheet = await this.service.spreadsheets.create({
  //    resource: {
  //      // TODO: Add desired properties to the request body.
  //    }
  //   });
  //   console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
  //  // return spreadsheet.data.spreadsheetId;
  // }


  public async getSpreadsheetId(slug : string): Promise<string> {
    const table = await this.loadTable(this.BASE_SPREASHEET_ID);
    if (!table) {
      return "";
    }

    console.log("table", table)
    const row = table.find((row) => row[0]?.toString() === slug?.toString());

    if (!row) {
      return "";
    }

    const [slugId, spreadsheetId] = row;
    return spreadsheetId;
  }


  private async loadTable(spreadsheetId : string): Promise<Table> {

    console.log("spreadsheetId", spreadsheetId)
    const result = await this.service.spreadsheets.values.get({
      spreadsheetId,
      range: "A1:G250",
    });

    console.log("result", result)
    return result?.data?.values as Table;
  }

  // public async getUser(id: string): Promise<any | null> {
  //   const table = await this.loadTable();

  //   if (!table) {
  //     return null;
  //   }

  //   const row = table.find((row) => row[0]?.toString() === id?.toString());

  //   if (!row) {
  //     return null;
  //   }

  //   const [userId, name, firstname, email, twitterId, githubId, createdAt] =
  //     row;

  //   const user: any = {
  //     id: userId,
  //     name,
  //     firstname,
  //     email,
  //     twitterId,
  //     githubId,
  //     createdAt,
  //   };

  //   return user;
  // }

  // public async addUser(user: any): Promise<any | null> {
  //   const existingUser = await this.getUser(user.id);

  //   if (existingUser) {
  //     return null;
  //   }

  //   const values = [
  //     [
  //       user.id,
  //       user.name,
  //       user.firstname,
  //       user.email,
  //       user.twitterId,
  //       user.githubId,
  //       user.createdAt,
  //     ],
  //   ];

  //   const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
  //     spreadsheetId: this.spreadsheetId,
  //     range: `Sheet1!A1:G1`,
  //     valueInputOption: "RAW",
  //     responseValueRenderOption: "UNFORMATTED_VALUE",
  //     insertDataOption: "INSERT_ROWS",
  //     includeValuesInResponse: true,
  //     requestBody: {
  //       values,
  //       majorDimension: "ROWS",
  //     },
  //   };

  //   const response = await this.service.spreadsheets.values.append(request);
  //   const updatedRow = response?.data?.updates?.updatedData?.values?.[0];

  //   if (!updatedRow) {
  //     return null;
  //   }

  //   const [id, name, firstname, email, twitterId, githubId, createdAt] =
  //     updatedRow;

  //   const updatedUser = {
  //     id,
  //     name,
  //     firstname,
  //     email,
  //     twitterId,
  //     githubId,
  //     createdAt,
  //   };

  //   return updatedUser;
  // }

  private authenticate(): void {
    const keyPath = path.join(
      process.cwd(),
      "src",
      "key",
      "zksub-ethcc-5bb39aa02dfa.json"
    );

    const auth: GoogleAuth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: this.SCOPES,
    });

    google.options({
      auth,
    });
  }
}
