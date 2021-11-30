//TODO
/*

import {openOrCreate, SQLiteDatabase} from "@nativescript-community/sqlite";
import fs from "@nativescript/core/file-system";

const filePath = fs.path.join(
  fs.knownFolders.documents().getFolder("db").path,
  "test.sqlite"
);


export type ServerAuth = {
  id: string,
  user: string,
  directionServer: string,
  token: string,
  refresh_token: string,
  select: boolean | number
}

export class ServerRepository {
  table = "server"
  sqlite = null! as SQLiteDatabase;

  constructor() {
    const createTable = "CREATE TABLE " + this.table + " (id TEXT, user TEXT, directionServer TEXT, token TEXT, refresh_token TEXT, select INTEGER)";
    this.sqlite = openOrCreate(filePath);
    this.sqlite.execute(createTable);

  }

  insert(serverAuth: ServerAuth) {
    this.sqlite.transaction(cancelTransaction => {
      this.sqlite.execute(
        "INSERT INTO server (id, user, directionServer, token, refresh_token, select) VALUES (?, ?)",
        [serverAuth.id, serverAuth.user, serverAuth.directionServer, serverAuth.token, serverAuth.refresh_token, serverAuth.select]
      )
    });
  }

  getAll() {
    this.sqlite.transaction(cancelTransaction => {
      this.sqlite.execute(
        "SELECT * FROM server"
      ).then((resolve) => {
        console.log(resolve)
      })
    });
  }
}
*/
