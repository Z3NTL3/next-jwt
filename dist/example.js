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
const jwt_1 = require("./jwt");
const fs = require("fs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    let jwt = new jwt_1.JWT(fs.readFileSync("test/pub.pem", "utf8"), fs.readFileSync("test/priv.pem", "utf8"));
    yield jwt.loadKey();
    let jwtToken = yield jwt.genToken({ uid: 1, name: "efdal" });
    console.log("Enc Token:\n", jwtToken);
    console.log(); // seperator line
    let decrypted = yield jwt.decrypt(jwtToken);
    console.log("Decrypted:\n", decrypted);
}))();
