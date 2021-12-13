import { getHttpWeb3, getWeb3 } from '@/utils/web3';

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
