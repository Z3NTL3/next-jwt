import crypto = require("node:crypto");
import fs = require("node:fs");

interface Keys {
  pub: string;
  priv: string;
}

/**
 *
 * @description Call this only if you want te re-generate
 */
function generateKey(): Promise<Error | Keys> {
  return new Promise((resolve) => {
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      },
      (err: Error | null, publicKey: string, privateKey: string) => {
        if (err) resolve(err);
        return resolve({ pub: publicKey, priv: privateKey });
      }
    );
  });
}

(async () => {
  let keys = await generateKey();
  if (keys instanceof Error) {
    console.log(keys);
    process.exit(-1);
  }

  fs.writeFileSync("pub.pem", keys.pub, { flag: "w" });
  fs.writeFileSync("priv.pem", keys.priv, { flag: "w" });
})();
export { generateKey };
