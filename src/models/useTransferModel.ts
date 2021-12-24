import { ChainId } from '@/constants/chainId';
import { changeNetwork } from '@/constants/network';
import { SetStateAction, useState } from 'react';

export default function useTransferModel() {
  const [chainArr, setchainArr] = useState([...ChainId]);
  const [input, setInput] = useState('');

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
    maxHandle,
    inputChange,
    switchChainId,
  };
}
