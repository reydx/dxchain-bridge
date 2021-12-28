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

  const transaction = async () => {
    if (!input || input === '0') return;
    await transferApi({
      token: searchToken,
      account,
      chainId,
      jsonConfig: Data,
      amount: input,
      callback: () => routerPush('/confirm'),
      errorCallback: () => routerPush('/'),
    });
  };

  return {
    transaction,
  };
}
