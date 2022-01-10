import { wethDeposit } from '@/api/deposit';
import useCommonHooks from '@/hooks/useCommonHooks';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { history, useModel } from 'umi';

export default function confirmHooks() {
  const { account } = useWeb3React();
  const { Data } = useModel('useGetState', (data) => data);
  const { routerPush } = useCommonHooks();

  useEffect(() => {
    if (history.action !== 'PUSH') {
      routerPush('/');
      return;
    }
    const { amount }: any = history.location.query;
    wethDeposit({
      amount,
      account,
      wethNativeContractAddress:
        Data.critical.assets.WETH.nativeContractAddress,
      callback: (txHash) => routerPush('/wrapping', { txHash }),
      errCallback: () => routerPush('/'),
    });
  }, []);

  return {};
}
