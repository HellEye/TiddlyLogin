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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserEndpoints = void 0;
const _1 = require(".");
const createUserEndpoints = (app) => {
    app.get("/api/userList", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const out = yield _1.userService.getUserList();
        return res.json(out);
    }));
    app.get("/api/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.params.id)
            return { message: "user.errors.noId" };
        const out = yield _1.userService.getUser(req.params.id);
        return res.send(out);
    }));
    app.post("/api/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const out = yield _1.userService.updateUser(req.body);
        return res.send(out);
    }));
    app.post("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const out = yield _1.userService.createUser(req.body.username, req.body.password, req.body.permissionLevel);
        return res.json(out);
    }));
    app.delete("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const out = yield _1.userService.deleteUser(req.body.username);
        return res.json(out);
    }));
    app.get("/", (req, res) => {
        return res.send("<h1>Yes it's working </h1>");
    });
    app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const out = yield _1.userService.loginWithUsername(req.body.username, req.body.password, req, res);
        return res.send(out);
    }));
    app.post("/api/logintoken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const out = yield _1.userService.loginWithToken((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token, req, res);
        return res.send(out);
    }));
};
exports.createUserEndpoints = createUserEndpoints;
