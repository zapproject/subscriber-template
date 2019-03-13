

import {Oracle} from "../Oracle/Oracle";
import {ZapSubscriber} from "@zapjs/subscriber"
import {Config} from "../Oracle/Config";
const Web3 = require('web3');
const HDWalletProviderMem = require("truffle-hdwallet-provider");
const delay = (ms:number) => new Promise(_ => setTimeout(_, ms));

class OffchainSubscriber{

  constructor(nmemonic:string,nodeURL:string){

  }
  /**
    Decide what oracle and endpoint you want to interact with,
    Approve, Bond dots to be ready to query (if there is not enough dots bound)
  */
  async setup(oracle:string,endpoint:string,dots:number){
      this.oracle = oracle
      this.endpoint = endpoint
      //setup subscriber, for demo reason, we use same wallet as provider's
      let web3 = new Web3(new HDWalletProviderMem(mnemonic, nodeURL,1))
      let accounts = await web3.eth.getAccounts();
      let subcriberOwner = accounts[0]
      let zapSubscriber = new ZapSubscriber(subcriberOwner, {networkProvider: web3, networkId: await web3.eth.net.getId()})
      // will skip approve and bond if there is enough dots already bound
      const boundDots = await
      if(boundDots<dots){
        let allowance = await zapSubscriber.getAllowance(oracle)
        let zapRred
        if(allowance)
        let txid = await zapSubscriber.bond(oracle,endpoint,dots)
        await waitForConfirm(txid)
        txid

      }



  }

  processResponse(response:string){
    // implement your custom logic here
  }

  async queryProvider(providerAddress:string){
      //start listening to incoming reponses
      zapSubscriber.listenToOffchainResponse({},(err:any,logs:any)=>{
          console.log("Response event from provider : ",logs)
          this.processResponse(logs)
      })


      //Get Oracle query list and query
      let endpoints = oracle.getEndpoints();
      endpoints.map((endpoint:any)=>{
          endpoint.queryList.map((query:any)=>{
              zapSubscriber.queryData({
                  provider: providerAddress,
                  query: query.query,
                  endpoint: endpoint.name,
                  endpointParams: query.params.slice(0),
                  gas: 300000
              })
                  .then(console.log)
                  .catch(console.error)
          })
      })
  }
}
