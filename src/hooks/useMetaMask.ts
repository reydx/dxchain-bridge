import { isETHChain } from '@/constants/chainId';
import { SerializedToken } from '@/models/useGetState';
import { ethereum } from '@/utils/web3';
import { useWeb3React } from '@web3-react/core';

export interface SerializedAddToken extends SerializedToken {
  address?: string;
}

export default function useMetaMask() {
  const { chainId } = useWeb3React();

  const metaMaskAddToken = async (token: SerializedAddToken, auto: boolean) => {
    if (!token) return;
    let address = token.address;

    if (auto) {
      address = isETHChain(chainId)
        ? token.nativeContractAddress
        : token.wrappedContractAddress;
    }

    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol: token.assetName,
            decimals: token.denomination,
            // image: `/${token.assetName}.png`,
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    metaMaskAddToken,
  };
}
