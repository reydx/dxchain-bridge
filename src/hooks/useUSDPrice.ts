import { useModel } from 'umi';
import { SerializedToken } from '@/models/useGetState';
import { getUSDPriceApi } from '@/api/ChainLink';
import { currencyToBigNumber, eight } from '@/utils/currency';
import { ETHCHAINID } from '@/constants/chainId';

export default function useUSDPrice() {
  const { Data } = useModel('useGetState', (data) => data);

  const getUSDPrice = async (
    token: SerializedToken,
    chainId = ETHCHAINID.MAINNET,
  ) => {
    let price = '0';

    try {
      switch (token.assetName) {
        case 'WETH':
          await getUSDPriceApi(
            Data.nonCritical.chainlinkEthUsdFeedAddress,
            chainId,
          ).then((res) => (price = res.answer));

          break;
        case 'DX':
          await getUSDPriceApi(
            Data.nonCritical.chainlinkDxUsdFeedAddress,
            chainId,
          ).then((res) => (price = res.answer));
          break;
        default:
          await getUSDPriceApi(token.chainlinkFeedAddress, chainId).then(
            (res) => (price = res.answer),
          );
          break;
      }
    } catch (error) {
      console.log(`error`, error);
    }
    // console.log(`price`, price);
    return currencyToBigNumber(price, eight);
  };

  const getEthUsdPrice = async () => {
    let price = '0';
    await getUSDPriceApi(
      Data.nonCritical.chainlinkEthUsdFeedAddress,
      ETHCHAINID.MAINNET,
    ).then((res) => (price = res.answer));

    return currencyToBigNumber(price, eight);
  };

  return {
    getUSDPrice,
    getEthUsdPrice,
  };
}
