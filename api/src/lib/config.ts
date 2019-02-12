import * as dotenv from "dotenv";


export interface ConfigInterface {
    getDB() : string;
    getPort() : number;
}

export class Config implements ConfigInterface {
    private DB: string;
    private PORT: number;

    public constructor() {
        dotenv.config();

        switch (process.env.NODE_ENV) {
            case "test":
                this.DB = process.env.DB_URI_TEST;
                this.PORT = 5000;
                break;
            case "production":
                this.DB = process.env.DB_URI_PROD;
                this.PORT = 4000;
                break;
            default:
                this.DB = process.env.DB_URI_DEV;
                this.PORT = Number(process.env.PORT) || 3000;
                break;
        }
    }

    public getDB() {
        return this.DB;
    }

    public getPort() {
        return this.PORT;
    }
}
