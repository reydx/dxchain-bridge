import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useModel } from 'umi';
import useCommonHooks from '@/hooks/useCommonHooks';
import { otherChainId } from '@/constants/chainId';

export default function TransferHooks() {
  const { chainId } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { chainArr, switchChainId } = useModel('useTransferModel', (m) => m);
  const { getChainTokenBalance } = useCommonHooks();
  const [fromData, setFromData] = useState({
    availableBalance: '0',
    EstimatedValue: '0',
  });
  const [toData, setToData] = useState({
    availableBalance: '0',
    fee: '0',
  });

  const getFromData = () => {
    getChainTokenBalance(searchToken, chainId).then((res) => {
      setFromData({
        ...fromData,
        availableBalance: res,
      });
    });
  };

  const getToData = () => {
    getChainTokenBalance(searchToken, otherChainId(chainId)).then((res) => {
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
    getToData();
  }, [chainId]);

  return {
    toData,
    fromData,
  };
}
