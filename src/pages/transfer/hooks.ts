import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useModel } from 'umi';
import useBalance from '@/hooks/useBalance';
import { isETHChain, otherChainId } from '@/constants/chainId';
import useUSDPrice from '@/hooks/useUSDPrice';
import { SerializedToken } from '@/models/useGetState';
import BigNumber from 'bignumber.js';
import { ethGasFee } from '@/api/transaction';

export default function TransferHooks() {
  const { chainId, account } = useWeb3React();
  const { searchToken } = useModel('useSelectModel', (m) => m);
  const { Data } = useModel('useGetState', (m) => m);
  const { chainArr, transferData, switchChainId, setTransferData, input } =
    useModel('useTransferModel', (m) => m);
  const { getChainTokenBalance } = useBalance();
  const { getUSDPrice, getEthUsdPrice } = useUSDPrice();
  const [inputDisabled, setinputDisabled] = useState(true);

  const estimatedTransferFee = async (
    token: SerializedToken,
    usd: BigNumber,
  ) => {
    let fee = new BigNumber(0);
    if (isETHChain(chainArr[0])) {
      fee = new BigNumber(token.onboardFeeDollars).div(usd);
    } else {
      const [gasFee, ethUsdPrice] = await Promise.all([
        ethGasFee({ token, input, jsonConfig: Data, account }),
        getEthUsdPrice(),
      ]);
      const gas = gasFee.times(ethUsdPrice);
      fee = new BigNumber(token.offboardFeeDollars).plus(gas).div(usd);
    }
    return fee;
  };

  const init = async () => {
    const [availableBalanceFrom, usd, availableBalanceTo] = await Promise.all([
      getChainTokenBalance(searchToken, chainId),
      getUSDPrice(searchToken),
      getChainTokenBalance(searchToken, otherChainId(chainId)),
    ]);

    const fee = await estimatedTransferFee(searchToken, usd);

    setTransferData({
      ...transferData,
      availableBalanceFrom,
      availableBalanceTo,
      usd,
      fee,
    });
  };

  useEffect(() => {
    if (chainArr[0] !== chainId) {
      switchChainId();
    }
    init();
  }, [chainId]);

  useEffect(() => {
    estimatedTransferFee(searchToken, transferData.usd).then((fee) => {
      setTransferData({ ...transferData, fee });
    });
  }, [input]);

  useEffect(() => {
    const num = Number(input);
    const isNAN = !num;
    const isNegativeNum = num <= 0;
    const LackOfBalance = num > transferData.availableBalanceFrom.toNumber();
    // const isGreaterThanGasFee = transferData.fee.toNumber() >= num;
    const isGreaterThanGasFee = false;

    setinputDisabled(
      isNAN || isNegativeNum || LackOfBalance || isGreaterThanGasFee,
    );
  }, [input, transferData]);

  return {
    inputDisabled,
  };
}
