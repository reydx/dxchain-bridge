import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useModel } from 'umi';
import useCommonHooks from '@/hooks/useCommonHooks';

export default function TransferHooks() {
  const { chainId, library, account } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { chainArr, switchChainId } = useModel('useTransferModel', (m) => m);
  const { getTokenBalance, getOtherChainTokenBalance } = useCommonHooks();
  const [fromData, setFromData] = useState({
    availableBalance: '0',
    EstimatedValue: '0',
  });
  const [toData, setToData] = useState({
    availableBalance: '0',
    fee: '0',
  });

  const getFromData = () => {
    getTokenBalance(searchToken).then((res) => {
      setFromData({
        ...fromData,
        availableBalance: res,
      });
    });

    getOtherChainTokenBalance(searchToken).then((res) => {
      setToData({
        ...toData,
        availableBalance: res,
      });
    });
  };

  useEffect(() => {
    if (chainArr[0] !== chainId) {
      switchChainId();
    }
    getFromData();
  }, [chainId]);

  return {
    toData,
    fromData,
    getTokenBalance,
  };
}
