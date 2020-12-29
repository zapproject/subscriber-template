require('dotenv').config()
const Web3 = require("web3")
const HDWalletProviderMem = require("@truffle/hdwallet-provider");
const fs = require("fs")
const wutils = require("web3-utils")
const mnemonic = process.env.MNEMONIC
let abi = fs.readFileSync("build/contracts/Subscriber.json", "utf-8")
const subAddress = "0xF08aD2D44c16d8d76E006C391931E11b972cEeC3"
const provider = process.env.ORACLE_ADDRESS
const ZapToken = require("@zapjs/zaptoken").ZapToken
const ZapBondage = require("@zapjs/bondage").ZapBondage
const endpoint = process.env.ORACLE_ENDPOINT
async function setup() {
  const web3 = new Web3(new HDWalletProviderMem({ mnemonic: process.env.MNEMONIC, providerOrUrl: `wss://${process.env.NETWORK}.infura.io/ws/v3/${process.env.INFURA_API_KEY}` }))

  const accounts = await web3.eth.getAccounts()
  let subscriber = accounts[0]
  abi = JSON.parse(abi)
  let subContract = new web3.eth.Contract(abi.abi, subAddress)

  // let tx = await subContract.methods.setProvider(provider,wutils.utf8ToHex(endpoint)).send({from:subscriber, gasPrice:4000000000})
  const zapBondage = new ZapBondage({ networkProvider: web3 })
  const zapToken = new ZapToken({ networkProvider: web3, networkId: 1 })
  // const approved = await subContract.methods.approve(100).send({ from: accounts[0] })
  // console.log('approved: ', approved)
  const bonded = await subContract.methods.bond(10).send({ from: accounts[0] })
  console.log('bonded: ', bonded)
  const query = await subContract.methods.query("test")
  console.log("Called query to Oracle", query)
  // unbond = await subContract.methods.unbond(1).send({ from: accounts[0] })
  // console.log('unbond: ', tx)
}
setup()
  .then(console.log)
  .catch(console.error)
