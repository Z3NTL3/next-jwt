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