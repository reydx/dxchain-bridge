import { ChainId } from '@/constants/chainId';
import { changeNetwork } from '@/constants/netWork';
import { useState } from 'react';

export default function useTransferModel() {
  const [chainArr, setchainArr] = useState([...ChainId]);

  const switchChainId = () => {
    changeNetwork(chainArr[1]).then(() => {
      setchainArr([...chainArr.reverse()]);
    });
  };

  return {
    chainArr,
    switchChainId,
  };
}
