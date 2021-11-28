//Dependency
const hdkey = require('hdkey')
const wif = require('wif')
const ecc = require('eosjs-ecc')
const bip39 = require('bip39')

//Required to write mnemonic
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

/*
  \x1b[32m - Green Text Color Code
  \x1b[0m - Reset Text Color Code
  \x1b[33m - Yellow Text Color Code
*/ 

  readline.question(`\x1b[32m What's your mnemonic key? \x1b[0m`, mnemonicInput => {
    //Convert 
    const seed = bip39.mnemonicToSeedSync(mnemonicInput).toString('hex');
    const master = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'));
    const node = master.derive("m/44'/194'/0'/0/0"); //Derive Path

    console.log("\x1b[33m publicKey: "+ecc.PublicKey(node._publicKey).toString()) //Public Key is displayed
    console.log(" privateKey: "+wif.encode(128, node._privateKey, false)+"\x1b[0m"); //Private Key is displayed
    readline.close();
  })


