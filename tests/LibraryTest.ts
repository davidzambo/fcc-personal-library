process.env.NODE_ENV = "test";

import * as chai from "chai";
import "mocha";
import * as mongoose from "mongoose";
import { describe } from "pm2";
import { Server } from "../src/index";
import { Config } from "../src/lib/config";
import { bookSchema } from "../src/model/Book";

chai.use(require("chai-http"));

const expect = chai.expect;
const assert = chai.assert;
const config = new Config();
mongoose.connect(config.getDB(), {useNewUrlParser: true});
const Book = mongoose.model("Book", bookSchema);
console.log(config.getDB());

describe("Library test", () => {
    // before(async (done: any) => {
    //     /**
    //      * Initialize test issues
    //      */
    //     try {
    //         await Book.remove({});
    //         await new Book({
    //             title: "Test book 01",
    //             comments: [],
    //             created_by: {
    //                 ip: "192.168.0.1",
    //                 system: "any",
    //             },
    //         }).save();
    //         await new Book({
    //             title: "Test book 02",
    //             comments: [{
    //                 comment: "ok",
    //                 created_by: {
    //                     ip: "192.168.1.1",
    //                     system: "something",
    //                 },
    //             }],
    //             created_by: {
    //                 ip: "192.168.0.2",
    //                 system: "any",
    //             },
    //         }).save();
    //         await new Book({
    //             title: "Test book 03",
    //             comments: [],
    //             created_by: {
    //                 ip: "192.168.0.3",
    //                 system: "any",
    //             },
    //         }).save();
    //         done();
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // });

    const server = new Server(config.getPort());
    server.init();

    describe("POST /api/books", () => {
        console.log("decribe 1");
        describe("fasztudjami", () => {
            console.log("decribe 2");
            it("should return the new book's _id, title and commentcount", async (done: any) => {
                console.log('it');
                await chai.request(server.app)
                    .post("/api/books")
                    .send({title: "happy"})
                    .end((err: any, res: any) => {
                        if (err) {
                            console.log(err);
                        }
                        expect(res).to.be.json;
                        expect(res.body).to.have.all.keys([
                            "_id",
                            "title",
                            "commentcount",
                        ]);
                        done();
                    });
            });

        });
    });

});
