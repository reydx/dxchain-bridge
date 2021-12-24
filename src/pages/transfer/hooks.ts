import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useModel } from 'umi';
import useCommonHooks from '@/hooks/useCommonHooks';
import { otherChainId } from '@/constants/chainId';
import useUSDPrice from '@/hooks/useUSDPrice';

export default function TransferHooks() {
  const { chainId, account } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { chainArr, fromData, toData, switchChainId, setFromData, setToData } =
    useModel('useTransferModel', (m) => m);
  const { getChainTokenBalance } = useCommonHooks();
  const { getUSDPrice } = useUSDPrice();

  const getFromData = async () => {
    const [availableBalance, usd] = await Promise.all([
      getChainTokenBalance(searchToken, chainId),
      getUSDPrice(searchToken),
    ]);

    setFromData({
      ...fromData,
      availableBalance,
      usd,
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

  return {};
}
