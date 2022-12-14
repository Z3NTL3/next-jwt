# next-jwt

API interface to create encrypted JWT tokens with custom claims and to decrypt.

##### API INFO
Public Key needs to be in ``PKCS8``<br>
Private Key needs to be in ``SPKI``

**Used Algorithm:** ``RSA``
**Encryption:** ``A256GCM``

#### Supports
- Custom JWT Claims Object
- Issuer
- Audience
- Expiration TimeStamp
- Issued at timestamp
- Encryption

# Example
```js
const { JWT } = require('next-jwt')
const { readFileSync } = require('node:fs')

async function test(){
    let jwt = new JWT(
        readFileSync('test/pub.pem','utf-8'),
        readFileSync('test/priv.pem','utf-8')
    )
    await jwt.loadKey();

    let jwtToken = await jwt.genToken({ uid: 1, name: "efdal" },2,'h','Pix4','api-access');
    console.log("Enc Token:\n", jwtToken);

    console.log(); // seperator line

    let decrypted = await jwt.decrypt(jwtToken);
    console.log("Decrypted:\n", decrypted);
}test()
```

### API
```js
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

type validID = "h" | "m" | "s"

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
  genToken(claims: User, expiration: Number, expUnit: validID, issuer: string, audience: string): Promise<string> {
    return new Promise(async (resolve) => {
      const jwt = await new jose.EncryptJWT({ claims })
        .setProtectedHeader({ alg: "RSA1_5", enc: "A256GCM" })
        .setIssuedAt()
        .setIssuer(issuer)
        .setAudience(audience)
        .setExpirationTime(`${expiration}${expUnit}`)
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
```
# NPM Lib
``npm i next-jwt@6.0.0``
