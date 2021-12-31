import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { awaitGetBlockTransactionCount, awaitTransaction } from '@/utils/web3';
import Web3 from 'web3';
import { currencyToBigNumber } from '@/utils/currency';
import useUSDPrice from '@/hooks/useUSDPrice';
import { isETHChain, otherChainId } from '@/constants/chainId';
import BigNumber from 'bignumber.js';
import useTimer from '@/hooks/useTimer';

export default function transactionHooks() {
  const { tokenAddressToTokenInfo, Data } = useModel('useGetState', (m) => m);
  const [percent1, setPercent1] = useState(0);
  const { start: startFirst, time: timeFirst, end: endFirst } = useTimer();
  const { getUSDPrice } = useUSDPrice();
  const [info, setInfo] = useState<any>({
    token: {},
    tChainId: undefined,
  });

  const init = async () => {
    const query: any = history.location.query || {};
    const txHash = query.txHash;
    if (!txHash) history.push('/');
    const [r1, r2]: any = await Promise.all([
      awaitTransaction(txHash),
      awaitGetBlockTransactionCount(txHash),
    ]);
    const ammount = currencyToBigNumber(
      Web3.utils.hexToNumberString(r1.logs[0].data),
    );
    const token = tokenAddressToTokenInfo(r1.to);
    const usPrice = await getUSDPrice(token);
    const price = usPrice.times(ammount);
    console.log(`r1`, r1);
    const effectiveGasPrice = Web3.utils.hexToNumber(r1.effectiveGasPrice);
    const gas = new BigNumber(effectiveGasPrice)
      .times(r1.gasUsed)
      .dividedBy(new BigNumber(10).pow(token.denomination));
    const gasPrice = usPrice.times(gas);
    const tChainId = Web3.utils.hexToNumber(r2.chainId);
    const oChainId = otherChainId(tChainId);

    setInfo({
      ...r1,
      ammount,
      token,
      price,
      gas,
      gasPrice,
      tChainId,
      oChainId,
    });
  };

  useEffect(() => {
    if (!info?.tChainId) return;
    const dxchainLastSeenBlock =
      Data.nonCritical.networkViews.dxchain.lastSeenBlock;
    const ethereumLastSeenBlock =
      Data.nonCritical.networkViews.ethereum.lastSeenBlock;
    const currentLastSeenBlock = isETHChain(info.tChainId)
      ? ethereumLastSeenBlock
      : dxchainLastSeenBlock;
    const blockNumber = info.blockNumber;
    const data = blockNumber - currentLastSeenBlock;
    if (data > 0 && data <= 35) {
      startFirst();
      const percent = Number(((data / 35) * 100).toFixed(2));
      setPercent1(percent);
    }
    if (data === 35) endFirst();
  }, [Data, info]);

  useEffect(() => {
    init();
  }, []);

  return {
    timeFirst,
    info,
    percent1,
  };
}
