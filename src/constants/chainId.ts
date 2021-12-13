export const ETHCHAINID = {
  MAINNET: 1,
  TESTNET: 3,
};

export const HTCHAINID = {
  MAINNET: 128,
  TESTNET: 256,
};

export const ChainId = [HTCHAINID[REACT_NET], ETHCHAINID[REACT_NET]];

export const otherChainId = (currentChainId: number | undefined): number => {
  if (currentChainId) {
    return ChainId.filter((item) => item !== currentChainId)[0];
  } else {
    return ChainId[1];
  }
};
