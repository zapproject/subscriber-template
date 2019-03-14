

import {ZapSubscriber} from "@zapjs/subscriber"
import {ZapBondage} from "@zapjs/bondage"
import {ZapToken} from "@zapjs/zaptoken"
import {Config} from "./Config";
const Web3 = require('web3');
const HDWalletProviderMem = require("truffle-hdwallet-provider");
const delay = (ms:number) => new Promise(_ => setTimeout(_, ms));

export class SimpleSubscriber{
  zapSubscriber: ZapSubscriber|null
  constructor(){
    this.zapSubscriber = null
  }
  /**
    Decide what oracle and endpoint you want to interact with,
    Approve, Bond dots to be ready to query (if there is not enough dots bound)
  */
  async setup(){
      //setup subscriber, for demo reason, we use same wallet as provider's
      let web3 = new Web3(new HDWalletProviderMem(Config.mnemonic,Config.NODE_URL,1))
      let accounts = await web3.eth.getAccounts();
      let subscriberOwner = accounts[0]
      let zapSubscriber = new ZapSubscriber(subscriberOwner, {networkProvider: web3, networkId: await web3.eth.net.getId()})
      let zapToken = new ZapToken({networkProvider: web3, networkId: await web3.eth.net.getId()})
      let zapBondage = new ZapBondage({networkProvider: web3, networkId: await web3.eth.net.getId()})

      // will skip approve and bond if there is enough dots already bound
      const boundDots = await zapSubscriber.getBoundDots({provider:Config.Oracle,endpoint:Config.Endpoint})
      if(boundDots<Config.dots){
        let allowance = await zapToken.contract.methods.allowance(subscriberOwner,zapBondage.contract._address).call()
        let zapRequired = await zapBondage.calcZapForDots({provider:Config.Oracle,endpoint:Config.Endpoint,dots:Config.dots})
        if(allowance<zapRequired){
          let txid = await zapSubscriber.approveToBond({provider:Config.Oracle,zapNum:zapRequired})
        }
        let txid = await zapSubscriber.bond({provider:Config.Oracle,endpoint:Config.Endpoint,dots:Config.dots})
      }
      //start listening to incoming reponses
      zapSubscriber.listenToOffchainResponse({},(err:any,logs:any)=>{
          console.log("Response event from provider : ",logs)
          this.processResponse(logs)
      })
  }

  processResponse(response:string){
    // implement your custom logic here
    console.log("Process response from Oracle : ",response)
  }

  async queryProvider(query:string,params:string[]){

      if(this.zapSubscriber){
          return await this.zapSubscriber.queryData({
              provider: Config.Oracle,
              query: query,
              endpoint: Config.Endpoint,
              endpointParams: params
          })
      }
      else{
        return "No subscriber found"
      }

  }
}
