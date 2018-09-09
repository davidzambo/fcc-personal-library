import { Config } from "./lib/config";
import { Server } from "./server";

const config = new Config();
const server = new Server(config.getPort());

try {
    server.init();
} catch (e) {
    // tslint:disable-next-line
    console.log(e.message);
}
