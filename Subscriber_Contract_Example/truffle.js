require('babel-register');
require('babel-polyfill');

const HDWalletProviderMem = require("truffle-hdwallet-provider");
//Kovan mnemonic
const mnemonic = "solid giraffe crowd become skin deliver screen receive balcony ask manual current";

module.exports = {
    networks: {
        "main":{
          host:"localhost",
          port: 8545,
          network_id:"1"
        },
        development: {
            host: "localhost",
            port: 9545,
            network_id: "*",
            // gas: "7000000",
            // gasPrice: "4000000000"
        },
        "ganache-gui": {
            host: "localhost",
            port: 7545,
            network_id: "5777",
            gas: "6700000",
            gasPrice: "10000000"
        }
    }
};
