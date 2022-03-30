"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const forwarding_1 = require("./forwarding");
const process_1 = require("process");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 5000;
app.use((0, cookie_parser_1.default)());
(0, db_1.connectToMongo)();
// setup(app)
(0, forwarding_1.setUpForwarding)(app);
(0, db_1.createEndpoints)(app);
/* app.get("/", (req, res) => {
  return res.send(`
  url: ${req.url}<br>
  hostname: ${req.hostname}<br>
  header: ${JSON.stringify(req.headers)}<br>
  `)
}) */
app.listen(PORT, () => {
    console.log(`Server running on ${PORT} in ${process_1.env.NODE_ENV} env`);
});
