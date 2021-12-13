export const ETHCHAINID = {
  MAINNET: 1,
  TESTNET: 3,
};

export const HTCHAINID = {
  MAINNET: 128,
  TESTNET: 256,
};

export const ChainId = [HTCHAINID[REACT_NET], ETHCHAINID[REACT_NET]];

export const ChainName = {
  [ETHCHAINID.MAINNET]: 'Ethereum',
  [ETHCHAINID.TESTNET]: 'Ropsten',
  [HTCHAINID.MAINNET]: 'Hecochain',
  [HTCHAINID.TESTNET]: 'Hecochain-testnet',
};
