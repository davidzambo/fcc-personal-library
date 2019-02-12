import { Application } from "express";
import { BookController } from "../controller/BookController";
import { CommentController } from "../controller/CommentController";
import { LibraryController } from "../controller/LibraryController";

export class Router {
    public static initializePaths(app: Application) {
        app.post("/api/books", BookController.create);
        app.get("/api/books", BookController.read );
        app.get("/api/books/:id", BookController.show);
        app.post("/api/books/:id", CommentController.create);
        app.delete("/api/books/:id", BookController.delete);
        app.delete("/api/books", BookController.reset);
        app.all("/", LibraryController.index);
        app.all("/(*)?(/*)?", LibraryController.error);
        return app;
    }
}
