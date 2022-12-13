/*
 *  Programmed by Z3NTL3 (Efdal) GNU license see LICENSE file
 */

import jose = require("jose");

interface Keys {
  priv: jose.KeyLike;
  pub: jose.KeyLike;
}

interface User {
  uid: number;
  name: string;
}

class JWT {
  pub: any;
  priv: any;
  secret: any;

  /**
   * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
   * @param publicKey Public Key as String
   * @param privateKey Private key as String
   */
  constructor(publicKey: string, privateKey: string) {
    this.pub = publicKey;
    this.priv = privateKey;
  }

  /**
   * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
   * @description Initialization part
   */
  loadKey(): Promise<Keys> {
    return new Promise(async (resolve) => {
      this.secret = await jose.generateSecret("HS512");
      let privK = await jose.importPKCS8(String(this.priv), "HS512");
      let pubK = await jose.importSPKI(String(this.pub), "HS512");

      this.priv = privK;
      this.pub = pubK;

      return resolve({ priv: privK, pub: pubK });
    });
  }
  /**
   * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
   * @description Encrypted JWT token
   */
  genToken(claims: User): Promise<string> {
    return new Promise(async (resolve) => {
      const jwt = await new jose.EncryptJWT({ claims })
        .setProtectedHeader({ alg: "RSA1_5", enc: "A256GCM" })
        .setIssuedAt()
        .setIssuer("Pix4 API")
        .setAudience("api-access")
        .setExpirationTime("2h")
        .encrypt(this.priv, this.secret);

      return resolve(jwt);
    });
  }

  /**
   * @author Z3NTL3 (Efdal) <z3ntl3discord@gmail.com>
   * @param token JWT token
   * @returns Decrypted JWT results
   */
  decrypt(token: string): Promise<jose.JWTDecryptResult> {
    return new Promise(async (resolve) => {
      const jwt = await jose.jwtDecrypt(token, this.priv, this.secret);
      return resolve(jwt);
    });
  }
}

export { JWT };
