import { useState } from 'react';
import { useModel } from 'umi';
import { transferApi } from '@/api/transaction';
import { useWeb3React } from '@web3-react/core';
import useCommonHooks from './useCommonHooks';
import { getHttpWeb3 } from '@/utils/web3';
import { isETHChain, otherChainId } from '@/constants/chainId';

export default function useTransfer() {
  const { account, chainId } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { input, setInput, chainArr } = useModel('useTransferModel', (m) => m);
  const { Data } = useModel('useGetState', (m) => m);
  const { routerPush } = useCommonHooks();
  const [loading, setLoading] = useState(false);

  const transaction = async () => {
    const onTheBridge = isETHChain(chainArr[0]);
    if (!chainId) return;
    setLoading(true);
    switch (searchToken.assetName) {
      case 'ETH':
        break;

      default:
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
            routerPush(`/transaction`, { txHash, otherChainBlock });
          },
          errorCallback: () => {
            routerPush('/');
            setLoading(false);
          },
        }).then((res) => {
          console.log(`res`, res);
        });
        break;
    }
    setLoading(false);
  };

  return {
    loading,
    transaction,
  };
}
