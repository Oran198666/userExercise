import mysql2, { QueryResult } from "mysql2";
import { appConfig } from "./app-config";
import { resolve } from "node:dns";
import { rejects } from "node:assert";

class Dal {
    private readonly connection = mysql2.createPool({
        host: appConfig.mysqlHost,
        user: appConfig.mysqlUser,
        password: appConfig.mysqlPassword,
        database: appConfig.mysqlDatabase
    });

    public execute(sql: string, values?: (string | number | null)[]): Promise<QueryResult> {
        return new Promise<QueryResult>((resolve,reject)=>{
            this.connection.query(sql, values, (err,result)=>{
                if(err) reject (err);
                else resolve(result);
            })
        })
    }
}

export const dal = new Dal();
