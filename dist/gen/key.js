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
exports.generateKey = void 0;
const crypto = require("node:crypto");
const fs = require("node:fs");
/**
 *
 * @description Call this only if you want te re-generate
 */
function generateKey() {
    return new Promise((resolve) => {
        crypto.generateKeyPair("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: "spki",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        }, (err, publicKey, privateKey) => {
            if (err)
                resolve(err);
            return resolve({ pub: publicKey, priv: privateKey });
        });
    });
}
exports.generateKey = generateKey;
(() => __awaiter(void 0, void 0, void 0, function* () {
    let keys = yield generateKey();
    if (keys instanceof Error) {
        console.log(keys);
        process.exit(-1);
    }
    fs.writeFileSync("pub.pem", keys.pub, { flag: "w" });
    fs.writeFileSync("priv.pem", keys.priv, { flag: "w" });
}))();
