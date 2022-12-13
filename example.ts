import { JWT } from "./jwt";
import fs = require("fs");

(async () => {
  let jwt = new JWT(
    fs.readFileSync("test/pub.pem", "utf8"),
    fs.readFileSync("test/priv.pem", "utf8")
  );
  await jwt.loadKey();

  let jwtToken = await jwt.genToken({ uid: 1, name: "efdal" });
  console.log("Enc Token:\n", jwtToken);

  console.log(); // seperator line

  let decrypted = await jwt.decrypt(jwtToken);
  console.log("Decrypted:\n", decrypted);
})();
