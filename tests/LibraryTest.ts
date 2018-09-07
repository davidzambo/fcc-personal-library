process.env.NODE_ENV = "test";

import * as chai from "chai";
import "mocha";
import * as mongoose from "mongoose";
import { config } from "../src/lib/config";
import { Server } from "../src/index";
import { bookSchema } from "../src/model/Book";

chai.use(require("chai-http"));
mongoose.connect(config.DB, {useNewUrlParser: true});

const expert = chai.expect;
const assert = chai.assert;
export const Book = mongoose.model("Book", bookSchema);


describe("Library test", () => {
    before((done: any) => {
        /**
         * Initialize test issues
         */
        const bookTest_011: bookSchema = {
            
        };
        Book.remove(() => {
            Book.create({

            });
        });
    });
});
