process.env.NODE_ENV = "test";

import * as chai from "chai";
import "mocha";
import * as mongoose from "mongoose";
import { describe } from "pm2";
import { Config } from "../src/lib/config";
import { Book } from "../src/model/Book";
import { Server } from "../src/server";

chai.use(require("chai-http"));

const expect = chai.expect;
const config = new Config();
mongoose.connect(config.getDB(), {useNewUrlParser: true});

describe("Library Test", () => {
    before(async () => {
        await Book.deleteMany({});
        const book01 = new Book({
            title: "Test book 01",
            comments: [],
            created_by: {
                ip: "192.168.0.1",
                system: "any",
            },
        });

        const book02 = new Book({
            title: "Test book 02",
            comments: [{
                comment: "ok",
                created_by: {
                    ip: "192.168.1.1",
                    system: "something",
                },
            }],
            created_by: {
                ip: "192.168.0.2",
                system: "any",
            },
        });

        const book03 = new Book({
            title: "Test book 03",
            comments: [],
            created_by: {
                ip: "192.168.0.3",
                system: "any",
            },
        });

        await book01.save();
        await book02.save();
        await book03.save();
    });

    /**
     * Initialize server
     */
    const server = new Server(config.getPort());
    server.init();
    describe("fail", () => {
       it("should fail", (done: any) => {
          chai.assert.equal(1, 2);
          done();
       });
    });

    // describe("POST /api/books", () => {
    //     it("should store a book", (done: any) => {
    //         const title = "test 01";
    //         chai.request(server.app)
    //             .post("/api/books")
    //             .send({title})
    //             .end((err: any, res: any) => {
    //                 if (err) {
    //                     done(err);
    //                 }
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("book");
    //                 expect(res.body.book).to.have.all.keys(["title", "_id"]);
    //                 expect(res.body.book.title).to.equal(title);
    //                 done();
    //             });
    //     });
    //
    //     it("should return an error", (done: any) => {
    //         chai.request(server.app)
    //             .post("/api/books")
    //             .end((err: any, res: any) => {
    //                 if (err) {
    //                     done(err);
    //                 }
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("error");
    //                 done();
    //             });
    //     });
    // });

    // describe("GET /api/books", () => {
    //     it("should get all the books", (done: any) => {
    //         chai.request(server.app)
    //             .get("/api/books")
    //             .end((err: any, res: any) => {
    //                 if (err) {
    //                     done(err);
    //                 }
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("books");
    //                 done();
    //             });
    //     });
    //     it("should get all books have _id, title and commentcount", (done: any) => {
    //         chai.request(server.app)
    //             .get("/api/books")
    //             .end((err: any, res: any) => {
    //                 if (err) {
    //                     done(err);
    //                 }
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("books");
    //                 expect(res.body.books).to.be.an("array");
    //                 res.body.books.map((book: any) => {
    //                     expect(book).to.have.all.keys(["_id", "title", "commentcount"]);
    //                 });
    //                 const commentedBook: any = res.body.books.filter((book: any) => {
    //                     return book.commentcount > 0;
    //                 });
    //                 expect(commentedBook.length).to.equal(1);
    //                 done();
    //             });
    //     });
    //
    //     it("should get one book has at least one comment", (done: any) => {
    //         chai.request(server.app)
    //             .get("/api/books")
    //             .end((err: any, res: any) => {
    //                 if (err) {
    //                     done(err);
    //                 }
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("books");
    //                 expect(res.body.books).to.be.an("array");
    //                 res.body.books.map((book: any) => {
    //                     expect(book).to.have.all.keys(["_id", "title", "commentcount"]);
    //                 });
    //                 const commentedBook: any = res.body.books.filter((book: any) => {
    //                     return book.commentcount > 0;
    //                 });
    //                 expect(commentedBook.length).to.greaterThan(0);
    //                 done();
    //             });
    //     });
    // });

    // describe("GET /api/books/:id", () => {
    //     it("should return 'no book exists' on invalid id", (done: any) => {
    //         chai.request(server.app)
    //             .get("/api/books/something")
    //             .end((err: any, res: any) => {
    //                expect(res).to.be.json;
    //                expect(res.body).to.have.property("book");
    //                expect(res.body.book).to.be.equal("no book exists");
    //                done();
    //             });
    //     });
    //
    //     it("should return 'no book exists' on valid id but not existing book", (done: any) => {
    //         chai.request(server.app)
    //             .get("/api/books/5b94d60d95e3fa18e8534e58")
    //             .end((err: any, res: any) => {
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("book");
    //                 expect(res.body.book).to.be.equal("no book exists");
    //                 done();
    //             });
    //     });
    //
    //     it("should return a book", async () => {
    //         const book: any = await Book.findOne({});
    //         chai.request(server.app)
    //             .get("/api/books/" + book._id)
    //             .end((err: any, res: any) => {
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("book");
    //                 expect(res.body.book).to.have.all.keys(["_id", "comments", "title"]);
    //                 expect(res.body.book.comments).to.deep.equal(book.comments);
    //                 expect(res.body.book.title).to.equal(book.title);
    //             });
    //     });
    // });

    // describe("POST /api/books/:id", () => {
    //     it("should return 'no book exists' on invalid id", (done: any) => {
    //         chai.request(server.app)
    //             .post("/api/books/something")
    //             .end((err: any, res: any) => {
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("book");
    //                 expect(res.body.book).to.be.equal("no book exists");
    //                 done();
    //             });
    //     });
    //
    //     it("should return 'no book exists' on valid id but not existing book", (done: any) => {
    //         chai.request(server.app)
    //             .post("/api/books/5b94d60d95e3fa18e8534e58")
    //             .end((err: any, res: any) => {
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("book");
    //                 expect(res.body.book).to.be.equal("no book exists");
    //                 done();
    //             });
    //     });
    //
    //     it("should return error message on missing comment", async () => {
    //         const book: any = await Book.findOne({});
    //         chai.request(server.app)
    //             .post(`/api/books/${book._id}`)
    //             .end((err: any, res: any) => {
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("error");
    //                 expect(res.body.error).to.be.equal("missing comment");
    //             });
    //     });
    //
    //     it("should return an updated book", async () => {
    //         const book: any = await Book.findOne({});
    //         chai.request(server.app)
    //             .post(`/api/books/${book._id}`)
    //             .send({ comment: "new comment" })
    //             .end((err: any, res: any) => {
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property("book");
    //                 expect(res.body.book.comments.length).to.be.equal(book.comments.length + 1);
    //             });
    //     });
    // });
});
