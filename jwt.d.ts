import jose = require("jose");
interface Keys {
    priv: jose.KeyLike;
    pub: jose.KeyLike;
}
interface User {
    uid: number;
    name: string;
}
type validID = "h" | "m" | "s";
declare class JWT {
    pub: any;
    priv: any;
    secret: any;
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @param publicKey Public Key as String
     * @param privateKey Private key as String
     */
    constructor(publicKey: string, privateKey: string);
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @description Initialization part
     */
    loadKey(): Promise<Keys>;
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @description Encrypted JWT token
     */
    genToken(claims: User, expiration: Number, expUnit: validID, issuer: string, audience: string): Promise<string>;
    /**
     * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
     * @param token JWT token
     * @returns Decrypted JWT results
     */
    decrypt(token: string): Promise<jose.JWTDecryptResult>;
}
export { JWT };
