const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const INIT_CODE_PAIR_HASH_JSON = require("../../../deployments/1503/INIT_CODE_PAIR_HASH.json")

async function writeHex(){
    
    const hexDir = path.join(__dirname, `../../contracts/ROUTER.sol`);
    const txtStartDir = path.join(__dirname, `/textStart.txt`);
    const txtEndDir = path.join(__dirname, `/textEnd.txt`);

    if (!fs.existsSync(hexDir)) {
        console.error()
    }

    let txtStart = ''
    let txtEnd = ''
    let txtHex = ''

    txtHex = INIT_CODE_PAIR_HASH_JSON.INIT_CODE_PAIR_HASH.toString()
    txtHex = txtHex.substring(2)
    txtStart =fs.readFileSync(txtStartDir, 'utf-8');
    txtEnd = fs.readFileSync(txtEndDir, 'utf-8')
    const codeString = txtStart.concat(txtHex ,txtEnd)

    await writeFile(hexDir, codeString, (err) => {
        console.log(err)
        console.log('successfully writing:')
    });
}

module.exports = {
    writeHex
}