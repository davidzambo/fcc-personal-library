import * as dotenv from "dotenv";
dotenv.config();

export const config: any = () => {
    switch (process.env.NODE_ENV) {
        case "test":
            return {
                DB: process.env.DB_ADDRESS_TEST,
                PORT: 5000,
            };
        case "production":
            return {
                DB: process.env.DB_ADDRESS_PROD,
                PORT: 4000,
            };
        default:
            return {
                DB: process.env.DB_ADDRESS_DEV,
                PORT: 3000,
            };

}
