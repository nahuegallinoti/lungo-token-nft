# lungo-token-nft


market-frontend
---------------
+Frontend for marketplace
+Transactions using a custom token: 'LUNGO Token'

Actions allowed
---------------
+Mint NFT

+List NFT

+Delist NFT

+Sell NFT

+Buy NFT  


nft-token-solidity
-------------------
+Smart Contracts - Solidity 0.8.1


Used tools
----------

+Truffle --> Project initialization, creation of contracts, manage of migrations, deploy of contracts

+ReMix --> Online editor for deploy and test methods of smart contracts

+Ganache --> Local blockchain used for deploy of contracts (allowing get detailed info of contract transactions) and creation of test accounts with public and private key

Running the project
-------------------

1. Open the folder called 'nft-token-solidity'
2. Open terminal on the folder
3. Run the following commands: 

  -npm install
  
  ```diff
  #NOTE: Make sure to replace the following variables in the next files:
  
  contracts/3.MarketNFT.sol
  --------------------------
  
  *nftContract: contract address NFT
  
  *tokenContract: contract address LUNGO token

  
  -truffle build --> build the contracts and generate '.json' files in the 'build' folder (.json files are required in the frontend)
  
  -truffle migrate --> run the files of 'migrations' folder and deploy the contracts on the network configured in 'truffle-config.js' file
  
  #NOTE: Actually the project is configured for deploy contracts on local network. (port 8545)
  
4. Go to 'market-frontend' folder and open 'index.html' file with an editor text
  
  #NOTE: Make sure to replace the following variables in 'blockchain_stuff.js' file:
   
  *NETWORK_ID: Actually use 5777 (localhost)
  
  *NFT_CONTRACT_ADDRESS: contract address NFT
  
  *MARKETPLACE_CONTRACT_ADDRESS: contract address Market NFT
  
  *TOKEN_CONTRACT_ADDRESS: contract address LUNGO token
  
5. Execute the following commands on the folder

   -npm i -g lite-server
   
   -lite-server
  
  
  Tip: You can load in ReMix your deployed contracts on Ganache. So every transaction to each contract will be log in Ganache
