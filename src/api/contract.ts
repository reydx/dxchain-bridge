import {
  getHttpWeb3,
  getWeb3,
  getEthChainHttpWeb3,
  getDxChainHttpWeb3,
} from '@/utils/web3';

export const getContract = (abi: any, address: string | undefined) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(abi, address);
};

export const getOtherChainContract = (
  abi: any,
  address: string | undefined,
  chainId: number,
) => {
  const web3 = getHttpWeb3(chainId);
  return new web3.eth.Contract(abi, address);
};

export const getChainContract = (
  abi: any,
  address: string | undefined,
  isEthChain: boolean,
) => {
  if (isEthChain) {
    const web3Eth = getEthChainHttpWeb3();
    return new web3Eth.eth.Contract(abi, address);
  } else {
    const web3Dx = getDxChainHttpWeb3();
    return new web3Dx.eth.Contract(abi, address);
  }
};
