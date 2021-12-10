import web3 from '@/utils/web3';
import abi from '@/constants/abi/DX.json';
import { AbiItem } from 'web3-utils';

const contract = new web3.eth.Contract(abi as AbiItem[]);

export const getBalance = async (
  account: string = '',
  tokenAddress: string = '',
): Promise<string> => {
  contract.options.address = tokenAddress;
  const result = await contract.methods.balanceOf(account).call();
  return result;
};
