# Decentralized Real Estate Marketplace

Final Project for Blockchain NanoDegree that requires to mint own tokens to represent the title to the properties. Before minting the token, the owner needs to verify she/she owns the property. A zk-SNARKs (zoKrates) mechanism will be used to create a verification system which can prove the ownership of title to the property without revealing that specific information on the property. Once the token has been verified it will be placed on a blockchain market place (OpenSea) for others to purchase. 

## Contract addresses on Rinkeby testnet
### Verifier
```
0x2af5c1538248f1e5dd801e7eb961199c5b5839dc
```
### SolnSquareVerifier
```
0xab4f59ba8ee5370f98f352d4dd3dc5ecbff0e38e
```
### From Account
```
0x3dBfDB6645a29de012BC5018Ef95e354CCbE69f3
```

## Contract ABI
The contracts' ABI can be found in the folder `build/contracts` in this repo. Github may complain it's too large to display, then you may just choose to "view raw" or download the JSON files to your local and view.

## How to test the contract code locally
- Open a Terminal window and change directory to your project folder

- Run the command `truffle develop` to start a local ethereum network

- Open a new Terminal tab at the same directory, and use the command `truffle compile` to compile your solidity contract files

- Use the command `truffle test` to unit tests the contract

*Please be advised that the `ERC721Mintable.sol` was NOT deployed to Rinkeby and it was commented out in the `2_deploy_contracts.js` as in the final configuration. If you want to test on this file, just uncomment that piece so that it can also be deployed to your local network and can run testing scripts on it.*

You should see the testing results something like this:
```
Using network 'development'.

  Contract: TestERC721Mintable
    match erc721 spec
      ✓ should return total supply
      ✓ should get token balance
      ✓ should return token uri
      ✓ should transfer token from one owner to another (78ms)
    have ownership properties
      ✓ should fail when minting when address is not contract owner (47ms)
      ✓ should return contract owner

  Contract: TestSolnSquareVerifier
    Mint with verifier
      ✓ Verifying minting (673ms)
      ✓ Should fail when minting without verifying (104ms)

  Contract: TestVerifier
    Verify Tx
      ✓ Correct verification (539ms)
      ✓ Verifier captures wrong input (42ms)


  10 passing (6s)
```

## Mint tokens, list them on Opensea and purchase the tokens from another account

- 10 RET tokens were minted. The mint trxns can be found in the records of this account `0x3dBfDB6645a29de012BC5018Ef95e354CCbE69f3` on Rinkeby

- 5 tokens were listed on Opensea(testnet). The collection can be viewed here https://testnets.opensea.io/collection/realestatetitletoken

- Those 5 tokens were purchased by another address, the trxns can be found in the records of this account `0xB9E73f74451A779A4d8771886877AA5280495319` on Rinkeby; or, Opensea also displays past transactions of each NFT. For example, check out this one here https://testnets.opensea.io/assets/0xab4f59ba8ee5370f98f352d4dd3dc5ecbff0e38e/2


## Built with
```
Truffle v5.0.1 (core: 5.0.1)
Solidity - 0.5.10 (solc-js)
Node v10.7.0
```
# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
