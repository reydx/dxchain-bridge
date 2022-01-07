import { getOtherChainContract } from './contract';
import { isETHChain } from '@/constants/chainId';
import { getChainContract } from './contract';
import erc20Abi from '@/constants/abi/ERC20.json';
import dxErc20Abi from '@/constants/abi/DXERC20.json';

export const getBalance = async (
  account: string | null | undefined = '',
  tokenAddress: string = '',
  chainId?: number,
): Promise<string> => {
  const contract = getChainContract(
    dxErc20Abi,
    tokenAddress,
    isETHChain(chainId),
  );
  const result = await contract.methods.balanceOf(account).call();
  return result;
};

type transferLogsType = {
  oChainId: number;
  tokenAddress: string;
  otherChainBlock: number;
  account: string;
  Data: any;
};

export const transferEvents = async (props: transferLogsType) => {
  const { account, otherChainBlock, oChainId, tokenAddress, Data } = props;
  const abi = isETHChain(oChainId) ? erc20Abi : dxErc20Abi;
  const contract = getOtherChainContract(abi, tokenAddress, oChainId);
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  if (isETHChain(oChainId)) {
    return await contract.getPastEvents(
      'Transfer',
      {
        fromBlock: otherChainBlock,
        toBlock: 'latest',
        filter: {
          from: Data.critical.walletAddress.ethereum,
          to: account,
        },
      },
      (err, e) => {
        if (err) console.log(`err`, err);
        return e;
      },
    );
  } else {
    return await contract.getPastEvents(
      'Mint',
      {
        fromBlock: otherChainBlock,
        toBlock: 'latest',
        filter: {
          to: account,
          from: zeroAddress,
        },
      },
      (err, e) => {
        if (err) console.log(`err`, err);
        return e;
      },
    );
  }
};
