require('dotenv').config()
const subscriber = artifacts.require("Subscriber")
const { Artifacts } = require("@zapjs/artifacts")
const { utf8ToHex } = require("web3-utils")
const network = process.env.NETWORK
let COORDINATOR = null;
if (network.toUpperCase() === 'KOVAN') {
  COORDINATOR = Artifacts.ZAPCOORDINATOR.networks['42'].address
}
else if (network.toUpperCase() === 'MAINNET') {
  COORDINATOR = Artifacts.ZAPCOORDINATOR.networks['1'].address
}
else {
  throw new Error("Invalid network")
}
const OracleAddress = process.env.ORACLE_ADDRESS
const OracleEndpoint = utf8ToHex(process.env.ORACLE_ENDPOINT)
module.exports = function (deployer) {
  deployer.deploy(subscriber, COORDINATOR, OracleAddress, OracleEndpoint);
};
