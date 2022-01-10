export const ETHCHAINID = {
  MAINNET: 1,
  TESTNET: 3,
};

export const DXCHAINID = {
  MAINNET: 128,
  TESTNET: 256,
};

export const ChainId = [DXCHAINID[REACT_NET], ETHCHAINID[REACT_NET]];

export const ETHChainIds = [ETHCHAINID.MAINNET, ETHCHAINID.TESTNET];

export const otherChainId = (currentChainId: number | undefined): number => {
  if (currentChainId) {
    return ChainId.filter((item) => item !== currentChainId)[0];
  } else {
    return ChainId[1];
  }
};

export const isETHChain = (chainId: number | undefined) => {
  return chainId ? ETHChainIds.indexOf(Number(chainId)) !== -1 : false;
};

export const EthChainId = ETHCHAINID[REACT_NET];
export const DxChainId = DXCHAINID[REACT_NET];
