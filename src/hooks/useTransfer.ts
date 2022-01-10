import { useState } from 'react';
import { useModel } from 'umi';
import { transferApi } from '@/api/transaction';
import { useWeb3React } from '@web3-react/core';
import useCommonHooks from './useCommonHooks';
import { getHttpWeb3 } from '@/utils/web3';
import { otherChainId } from '@/constants/chainId';

export default function useTransfer() {
  const { account, chainId } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { input, setInput, chainArr } = useModel('useTransferModel', (m) => m);
  const { Data } = useModel('useGetState', (m) => m);
  const { routerPush } = useCommonHooks();
  const [loading, setLoading] = useState(false);

  const transferApiFn = async () => {
    if (!chainId) return;
    await transferApi({
      token: searchToken,
      account,
      chainId,
      jsonConfig: Data,
      amount: input,
      callback: () => {},
      successCallback: async (txHash) => {
        const otherChainBlock = await getHttpWeb3(
          otherChainId(chainId),
        ).eth.getBlockNumber();
        setInput('');
        routerPush(`/transaction`, { txHash, otherChainBlock, chainId });
      },
      errorCallback: () => {
        routerPush('/');
        setLoading(false);
      },
    }).then((res) => {
      console.log(`res`, res);
    });
  };

  const transaction = async () => {
    setLoading(true);
    switch (searchToken.assetName) {
      case 'ETH':
        routerPush('/confirm', { amount: input });
        break;
      default:
        transferApiFn();
        break;
    }
    setLoading(false);
  };

  return {
    loading,
    transaction,
    transferApiFn,
  };
}
