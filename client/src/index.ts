import { Server } from "./server";

const server = new Server(3100);

try {
    server.init();
} catch (e) {
    // tslint:disable-next-line
    console.log(e);
}
