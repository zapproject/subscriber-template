# Zap-subscriber-template

Template for creating and managing on-chain/off-chain zap subscriber

Check out our [Documentation](https://zapproject.gitbook.io/zapproject/users/onchain-subscriber-example) for more information about zap subscriber

## Subscriber_contract_example:

 On-chain subscriber contract that bond, query and receive response from Oracles with `callback`

### Layout:

- SSubscriber.sol : This is your subscriber contract that will bond-query-receive response, change name and structure as you go, this only meant to be an example. Only function `callback` need to be modified to add more custom logic of what to do with the responses received
- ZapBridge: This contract includes all the neccessary Zap Contracts function calls that your subscriber contract needs to call, such as bond, delegate bond, query


### Setup :
1. Fill out truffle config file with your wallet and node information
2. Fill out `2_subscriber_migration.js` file with information about Oracle and Endpoint to use
3. Implement function `callback` in SimpleSubscriber contract
4. Run `truffle compile`, `truffle migrate` to start create/get Oracle and start listening to queries   

#### Note :

- Ensure you have enough ETH and ZAP in your address
- Owner of contract can choose to call `approve` directly from owner, and call `delegateBond` function to bond contract to Oracle indirectly


### Usage
After successfully deploy your subscriber contract on blockchain, start using your subscriber contracts with couple simple steps:

  - Query provider (regarding to provided schema from provider)
  Provider will call function `callback` of subscriber, depends on the logic in the function that will determines what to happen

## Offchain_Subscriber_Example
 Off-chain subscriber script that approve, bond, query and listen to response events from Oracle
### Setup
  - Put your custom information in Config.ts file
  - Implement function `processResponse` to add your custom logic there to process responses received
### Usage
  - `yarn build`
  - `yarn start-offchain`
  Once Oracle response , you will see response string logged out and passed into function `processResponse`
