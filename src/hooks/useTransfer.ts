import { useState } from 'react';
import { useModel } from 'umi';
import { transferApi } from '@/api/transaction';
import { useWeb3React } from '@web3-react/core';
import useCommonHooks from './useCommonHooks';

export default function useTransfer() {
  const { account, chainId } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { input } = useModel('useTransferModel', (m) => m);
  const { Data } = useModel('useGetState', (m) => m);
  const { routerPush } = useCommonHooks();
  const [loading, setLoading] = useState(false);

  const transaction = async () => {
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
          successCallback: (txHash) => routerPush(`/transaction`, { txHash }),
          errorCallback: () => routerPush('/'),
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
