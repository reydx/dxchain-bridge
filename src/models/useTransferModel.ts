import { ChainId } from '@/constants/chainId';
import { changeNetwork } from '@/constants/network';
import BigNumber from 'bignumber.js';
import { SetStateAction, useEffect, useState } from 'react';

export default function useTransferModel() {
  const [chainArr, setchainArr] = useState([...ChainId]);
  const [input, setInput] = useState('');
  const [fromData, setFromData] = useState({
    availableBalance: new BigNumber(0),
    EstimatedValue: new BigNumber(0),
    usd: new BigNumber(0),
  });
  const [toData, setToData] = useState({
    availableBalance: new BigNumber(0),
    fee: new BigNumber(0),
  });

  const switchChainId = () => {
    changeNetwork(chainArr[1]).then(() => {
      setchainArr([...chainArr.reverse()]);
      inputChange('');
    });
  };

  const inputChange = (
    v: string,
    fromData?: { availableBalance: SetStateAction<string> },
  ) => {
    // if(Number(v) <= Number(fromData?.availableBalance) && Number(v) >= 0) {
    setInput(v);
    // }
  };

  const maxHandle = (fromData: any) => {
    setInput(fromData.availableBalance);
  };

  return {
    input,
    chainArr,
    fromData,
    toData,
    setFromData,
    setToData,
    maxHandle,
    inputChange,
    switchChainId,
  };
}
