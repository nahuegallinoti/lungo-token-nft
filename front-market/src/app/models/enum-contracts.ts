import { environment } from "src/environments/environment";

export enum ContractName {
    LUNGO_NFT = 'LungoNFT',
    MARKET_NFT = 'MarketNFT',
    LUNGO_TOKEN = 'LungoToken',
    ERC_20_OPERATOR = 'ERC20Operator',
    STAKING_NFT = 'StakingNFT',
    
}

export class ContractData {
    contracts = [
        {
            contract_name: 'LungoNFT',
            contract_address: environment.LUNGO_NFT_CONTRACT_ADDRESS,
            contract_abi: environment.LUNGO_NFT_CONTRACT_JSON_PATH
        },
        {
            contract_name: 'MarketNFT',
            contract_address: environment.MARKETPLACE_CONTRACT_ADDRESS,
            contract_abi: environment.MARKETPLACE_TOKEN_CONTRACT_JSON_PATH
        },
        {
            contract_name: 'LungoToken',
            contract_address: environment.LUNGO_TOKEN_CONTRACT_ADDRESS,
            contract_abi: environment.LUNGO_TOKEN_CONTRACT_JSON_PATH
        },
        {
            contract_name: 'ERC20Operator',
            contract_address: environment.ERC20_OPERATOR_CONTRACT_ADDRESS,
            contract_abi: environment.ERC20_OPERATOR_CONTRACT_JSON_PATH
        },
        {
            contract_name: 'StakingNFT',
            contract_address: environment.STAKING_NFT_CONTRACT_ADDRESS,
            contract_abi: environment.STAKING_NFT_CONTRACT_JSON_PATH
        }
    ]
}