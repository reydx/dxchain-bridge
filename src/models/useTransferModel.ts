import { ChainId } from '@/constants/chainId';
import { changeNetwork } from '@/constants/network';
import { SetStateAction, useState } from 'react';

export default function useTransferModel() {
  const [chainArr, setchainArr] = useState([...ChainId]);
  const [input, setInput] = useState('');
  const [fromData, setFromData] = useState({
    availableBalance: '0',
    EstimatedValue: '0',
    usd: '0',
  });
  const [toData, setToData] = useState({
    availableBalance: '0',
    fee: '0',
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

  const maxHandle = (fromData: {
    availableBalance: SetStateAction<string>;
  }) => {
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
