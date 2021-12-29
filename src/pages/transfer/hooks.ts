import { useEffect, useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useModel } from 'umi';
import useBalance from '@/hooks/useBalance';
import { otherChainId } from '@/constants/chainId';
import useUSDPrice from '@/hooks/useUSDPrice';
import BigNumber from 'bignumber.js';
import { eight } from '@/utils/currency';

export default function TransferHooks() {
  const { chainId, account } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const {
    chainArr,
    fromData,
    toData,
    switchChainId,
    setFromData,
    setToData,
    input,
  } = useModel('useTransferModel', (m) => m);
  const { getChainTokenBalance } = useBalance();
  const { getUSDPrice } = useUSDPrice();
  const [inputDisabled, setinputDisabled] = useState(true);

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

  useEffect(() => {
    const isNAN = !Number(input);
    const isNegativeNum = Number(input) <= 0;
    const LackOfBalance = Number(input) > fromData.availableBalance.toNumber();
    setinputDisabled(isNAN || isNegativeNum || LackOfBalance);
  }, [input, fromData]);

  return {
    inputDisabled,
  };
}
