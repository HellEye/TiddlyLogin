"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MONGO_PORT = 27017;
const connectToMongo = () => {
    (0, mongoose_1.connect)(`mongodb://db:${MONGO_PORT}/wikiUsers`)
        .then(() => {
        console.log(`Connected to mongo container on ${MONGO_PORT}`);
    })
        .catch((err) => {
        console.error(`Connection to mongo container on ${MONGO_PORT} failed`);
        console.error(err);
    });
};
exports.default = connectToMongo;
