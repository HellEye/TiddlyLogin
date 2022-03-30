"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Token = exports.DAY_IN_MILLISECONDS = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const users_1 = require("../users");
exports.DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
const getTokenExpireDate = (expireIn) => {
    if (expireIn === -1)
        return undefined;
    return new Date(Date.now() + expireIn * exports.DAY_IN_MILLISECONDS);
};
let Token = class Token {
    refreshExpireDate(expireIn) {
        this.expireAt = getTokenExpireDate(expireIn === undefined || expireIn === null ? this.expireIn : expireIn);
    }
};
__decorate([
    (0, typegoose_1.prop)({
        ref: () => users_1.User,
        type: () => typegoose_1.mongoose.Types.ObjectId,
        required: true,
        index: true,
    }),
    __metadata("design:type", Object)
], Token.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Token.prototype, "token", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], Token.prototype, "expireAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Token.prototype, "expireIn", void 0);
Token = __decorate([
    (0, typegoose_1.pre)("save", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.refreshExpireDate();
            next();
        });
    })
], Token);
exports.Token = Token;
