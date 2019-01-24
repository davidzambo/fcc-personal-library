import { Application } from "express";
import { LibraryController } from "../controller/LibraryController";


export class Router {
    public static initializePaths(app: Application) {
        app.all("/", LibraryController.index);
        app.all("/(*)?(/*)?", LibraryController.error);
        return app;
    }
}
