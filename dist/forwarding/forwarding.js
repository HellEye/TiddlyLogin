"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpForwarding = void 0;
const wikiConfig_json_1 = __importDefault(require("../wikiConfig.json"));
const db_1 = require("../db");
const path_1 = __importDefault(require("path"));
const getSubdomain = (hostname) => {
    return hostname.split(".")[0];
};
const PANEL_SUBDOMAIN = "controlpanel";
const setUpForwarding = (app) => {
    //authorization
    app.use("", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const subdomain = getSubdomain(req.hostname);
        const url = req.url;
        if (subdomain === PANEL_SUBDOMAIN && url.length < 2) {
            return res.sendFile(path_1.default.join(path_1.default.dirname(require.main.filename), "/public/index.html"));
        }
        // console.log("cookies: ", req.cookies)
        if (req.cookies.token) {
            const user = yield db_1.userService.loginWithToken(req.cookies.token, req, res);
            // console.log("user: ", user)
            if (user.user) {
                req.headers = Object.assign(Object.assign({}, req.headers), { wikiAuth: "asdf" });
            }
        }
        next();
    }));
    //Temp testing thing
    app.get("/wiki", (req, res) => {
        const hostName = req.hostname.split(".")[0];
        res.redirect(`http://localhost:${wikiConfig_json_1.default[hostName].port}`);
    });
};
exports.setUpForwarding = setUpForwarding;
