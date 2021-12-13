import abi from '@/constants/abi/DX.json';
import { getContract, getOtherChainContract } from './contract';

export const getBalance = async (
  account: string | null | undefined = '',
  tokenAddress: string = '',
  chainId?: number,
): Promise<string> => {
  console.log(`chainId`, tokenAddress);
  const contract = chainId
    ? getOtherChainContract(abi, tokenAddress, chainId)
    : getContract(abi, tokenAddress);
  const result = await contract.methods.balanceOf(account).call();
  return result;
};
