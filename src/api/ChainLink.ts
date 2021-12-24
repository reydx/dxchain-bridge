import abi from '@/constants/abi/chainlink.json';
import { isETHChain } from '@/constants/chainId';
import { getChainContract } from './contract';

export const getUSDPriceApi = async (
  chainlinkTokenUsdFeedAddress: string,
  chainId?: number,
) => {
  try {
    const contract = getChainContract(
      abi,
      chainlinkTokenUsdFeedAddress,
      isETHChain(chainId),
      'MAINNET',
    );

    return await contract.methods.latestRoundData().call();
  } catch (error) {
    console.log(`error`, error);
    return {};
  }
};
