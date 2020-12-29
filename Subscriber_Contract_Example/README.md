# ZAP Onchain Subscriber
- Onchain subscriber is a contract that follow a Zap oracle , bond, and query an Oracle and implement a callback method to determine what to do with the result.

This repository provides template for onchain subscriber to set Oracle address and endpoint to use,
bond/unbond , query, and process response, all onchain

## Subscriber as a contract
- Requirements:
+ Choose Oracle (get their address) and endpoint that subscriber will bond
+ Have mnemonic seed, with ETH and ZAP balance for the transaction
## Create subscriber contract using example
- `cd Subscriber_Contract_Example`
- `npm i `
### Implement subscriber contract with custom callback method
- *Modify contracts/subscriber.sol*
- `npx truffle compile`
### Migrate the contract
- `cp .env_example .env`
- Fill in information in .env for migration, specify oracle's address, endpoint, infura api key, and network (kovan, mainnet)
- `npm run migrate-kovan` (or `npm run migrate-main`)

##  Subscriber as a javascript script running locally
- Requirepments
