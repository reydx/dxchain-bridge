import abi from '@/constants/abi/DX.json';
import { isETHChain } from '@/constants/chainId';
import {
  getChainContract,
  getContract,
  getOtherChainContract,
} from './contract';

// export const getBalance = async (
//   account: string | null | undefined = '',
//   tokenAddress: string = '',
//   chainId?: number,
// ): Promise<string> => {
//   const contract = chainId
//     ? getOtherChainContract(abi, tokenAddress, chainId)
//     : getContract(abi, tokenAddress);
//   const result = await contract.methods.balanceOf(account).call();
//   return result;
// };

export const getBalance = async (
  account: string | null | undefined = '',
  tokenAddress: string = '',
  chainId?: number,
): Promise<string> => {
  const contract = getChainContract(abi, tokenAddress, isETHChain(chainId));
  const result = await contract.methods.balanceOf(account).call();
  return result;
};
