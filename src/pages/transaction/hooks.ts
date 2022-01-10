import { useEffect, useRef, useState } from 'react';
import { history, useModel } from 'umi';
import { awaitTransaction } from '@/utils/web3';
import Web3 from 'web3';
import { currencyToBigNumber } from '@/utils/currency';
import useUSDPrice from '@/hooks/useUSDPrice';
import { isETHChain, otherChainId } from '@/constants/chainId';
import BigNumber from 'bignumber.js';
import { transferEvents } from '@/api/DX';

export default function transactionHooks() {
  const { tokenAddressToTokenInfo, Data } = useModel('useGetState', (m) => m);
  const { getUSDPrice } = useUSDPrice();
  const [info, setInfo] = useState<any>({
    token: {},
  });
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [timeFirst, settTimeFirst] = useState(0);
  const [timeSecond, settTimeSecond] = useState(0);
  const timeRefId1: any = useRef();
  const timeRefId2: any = useRef();
  const timeRefId3: any = useRef();

  const startFirst = () => {
    if (timeRefId1.current) return;
    timeRefId1.current = setInterval(() => {
      settTimeFirst((time) => time + 1);
    }, 1000);
  };

  const endFirst = () => {
    if (timeRefId1.current) clearInterval(timeRefId1.current);
  };

  const startSecond = () => {
    if (timeRefId2.current) return;
    timeRefId2.current = setInterval(() => {
      settTimeSecond((time) => time + 1);
    }, 1000);
  };

  const endSecond = () => {
    if (timeRefId2.current) clearInterval(timeRefId2.current);
  };

  const init = async () => {
    const query: any = history.location.query || {};
    const { txHash, otherChainBlock, chainId } = query;
    if (!txHash) history.push('/');
    const oChainId = otherChainId(chainId);

    setInfo({
      ...info,
      chainId,
      oChainId,
    });

    const [r1]: any = await Promise.all([awaitTransaction(txHash)]);
    const ammount = currencyToBigNumber(
      Web3.utils.hexToNumberString(r1.logs[0].data),
    );
    const token = tokenAddressToTokenInfo(r1.to);
    const usPrice = await getUSDPrice(token);
    const price = usPrice.times(ammount);
    const effectiveGasPrice = Web3.utils.hexToNumber(r1.effectiveGasPrice);
    const gas = new BigNumber(effectiveGasPrice)
      .times(r1.gasUsed)
      .dividedBy(new BigNumber(10).pow(token.denomination));
    const gasPrice = usPrice.times(gas);

    setInfo({
      ...info,
      ...r1,
      txHash,
      ammount,
      token,
      price,
      gas,
      gasPrice,
      otherChainBlock,
      chainId,
      oChainId,
    });
  };

  useEffect(() => {
    if (!info?.chainId || percent1 === 100) return;
    const isEth = isETHChain(info.chainId);
    const dxchainLastSeenBlock =
      Data.nonCritical.networkViews.dxchain.lastSeenBlock;
    const ethereumLastSeenBlock =
      Data.nonCritical.networkViews.ethereum.lastSeenBlock;
    const currentLastSeenBlock = isEth
      ? ethereumLastSeenBlock
      : dxchainLastSeenBlock;
    const blockNumber = info.blockNumber;
    const num = currentLastSeenBlock - blockNumber;
    console.log(`num`, num);
    if (isEth) {
      if (num > -36 && num < 0) {
        const percent = Number((((num + 35) / 35) * 100).toFixed(2));
        startFirst();
        setPercent1(percent);
      } else if (num === 0) {
        setPercent1(100);
        endFirst();
      } else if (num > 0) {
        setPercent1(100);
        endFirst();
        startSecond();
      }
    } else {
      if (num === 0) {
        setPercent1(100);
        endFirst();
      } else if (num > 0) {
        setPercent1(100);
        endFirst();
        startSecond();
      }
    }
  }, [Data, info]);

  useEffect(() => {
    const { otherChainBlock, oChainId, token, from, txHash, chainId } = info;
    if (percent2 === 100) return;
    timeRefId3.current = setInterval(async () => {
      if (oChainId && otherChainBlock) {
        const tokenAddress = isETHChain(oChainId)
          ? token.nativeContractAddress
          : token.wrappedContractAddress;
        await transferEvents({
          oChainId: info.oChainId,
          otherChainBlock,
          tokenAddress,
          account: from,
          Data,
        }).then((res = []) => {
          console.log(`logRes`, res);
          res.forEach((item: any) => {
            if (isETHChain(chainId)) {
              if (item.returnValues.originTxId === txHash) {
                setPercent2(100);
                endSecond();
              }
            } else {
              setPercent2(100);
              endSecond();
            }
          });
        });
      }
    }, 3000);
    return () => clearInterval(timeRefId3.current);
  }, [info]);

  useEffect(() => {
    init();
    startFirst();

    return () => {
      endFirst();
      endSecond();
    };
  }, []);

  return {
    timeFirst,
    timeSecond,
    info,
    percent1,
    percent2,
  };
}
