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
exports.JWT = void 0;
const jose = require("jose");
class JWT {
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @param publicKey Public Key as String
     * @param privateKey Private key as String
     */
    constructor(publicKey, privateKey) {
        this.pub = publicKey;
        this.priv = privateKey;
    }
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @description Initialization part
     */
    loadKey() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            this.secret = yield jose.generateSecret("HS512");
            let privK = yield jose.importPKCS8(String(this.priv), "HS512");
            let pubK = yield jose.importSPKI(String(this.pub), "HS512");
            this.priv = privK;
            this.pub = pubK;
            return resolve({ priv: privK, pub: pubK });
        }));
    }
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @description Encrypted JWT token
     */
    genToken(claims) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const jwt = yield new jose.EncryptJWT({ claims })
                .setProtectedHeader({ alg: "RSA1_5", enc: "A256GCM" })
                .setIssuedAt()
                .setIssuer("Pix4 API")
                .setAudience("api-access")
                .setExpirationTime("2h")
                .encrypt(this.priv, this.secret);
            return resolve(jwt);
        }));
    }
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @param token JWT token
     * @returns Decrypted JWT results
     */
    decrypt(token) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const jwt = yield jose.jwtDecrypt(token, this.priv, this.secret);
            return resolve(jwt);
        }));
    }
}
exports.JWT = JWT;
