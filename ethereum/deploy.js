const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

const fs = require('fs');
const MNEMONIC = fs.existsSync(".secret") && fs.readFileSync(".secret").toString().trim();

const provider = new HDWalletProvider(MNEMONIC, "https://rinkeby.infura.io/v3/78a18edf98c34dcfa7202bebff714a56");
const web3 = new Web3(provider);


const deploy = async () => { 
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: "1000000" });
}

deploy().then((e) => {
    console.log('Deployed', e);
}).catch(err => { 
    console.log('Error deploying', err);
});

