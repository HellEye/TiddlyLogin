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
exports.wikiService = void 0;
const __1 = require("..");
class WikiService {
    findWiki(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = yield __1.Wikis.findOne({ _id });
            return out;
        });
    }
    getWikiList(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = yield __1.Wikis.find({}, { _id });
        });
    }
    createWiki(wiki) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = yield __1.Wikis.create(wiki);
            return out;
        });
    }
    updateWiki(_id, wiki) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = yield __1.Wikis.updateOne({ _id }, wiki);
            return out;
        });
    }
    removeWiki(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = yield __1.Wikis.deleteOne({ _id });
            return out;
        });
    }
}
const wikiService = new WikiService();
exports.wikiService = wikiService;
