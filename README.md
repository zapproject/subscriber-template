# Zap-subscriber-template

Template for creating and managing zap subscriber

## Layout :

1. Config : data about your wallet ,ethereum node and your provider's pubkey and title
2. Responder :  Stub callback function when receive query event and return result

## Usage :

1. Implement function `getResponse` in Responder
2. Run `npm start` to start create/get Oracle and start listening to queries   

## Note :

- Ensure you have enough ETH in your address for responding to queries


#### Subscriber_contract_example

- Onchain subscriber contract example
    + Set provider to interact with
    + Query provider (regarding to provided schema from provider)
    + Implement callback for provider's response

#### Subscriber_example.js

- Offchain subscriber example
    + Query endpoint and params (regarding to provided schema from provider)
    + Listen to OffchainResponse event from Provider

#### Demo.ts
- Workflow example from setting up oracle to running subscriber
- Run : `yarn startDemo`
