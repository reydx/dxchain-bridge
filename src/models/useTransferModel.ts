import { ChainId, isETHChain } from '@/constants/chainId';
import { changeNetwork } from '@/constants/network';
import { ethereum } from '@/utils/web3';
import BigNumber from 'bignumber.js';
import { SetStateAction, useEffect, useState } from 'react';
import { useModel } from 'umi';
import Web3 from 'web3';

export default function useTransferModel() {
  const { searchToken, setSearchToken } = useModel('useSelectModel', (m) => m);
  const { tokens } = useModel('useGetState', (m) => m);
  const [chainArr, setchainArr] = useState([...ChainId]);
  const [input, setInput] = useState('');
  const [transferData, setTransferData] = useState({
    availableBalanceFrom: new BigNumber(0),
    availableBalanceTo: new BigNumber(0),
    EstimatedValue: new BigNumber(0),
    usd: new BigNumber(0),
    fee: new BigNumber(0),
  });

  const switchChainId = () => {
    changeNetwork(chainArr[1]).then(() => {
      setchainArr([...chainArr.reverse()]);
      inputChange('');
      const isETH = isETHChain(chainArr[0]);
      if (!isETH && tokens.length && searchToken.assetName === 'ETH') {
        setSearchToken(tokens[0]);
      }
    });
  };

  const inputChange = (
    v: string,
    transferData?: { availableBalance: SetStateAction<string> },
  ) => {
    // if(Number(v) <= Number(transferData?.availableBalance) && Number(v) >= 0) {
    setInput(v);
    // }
  };

  const maxHandle = (num: string) => setInput(num);

  return {
    input,
    chainArr,
    transferData,
    setInput,
    setTransferData,
    maxHandle,
    inputChange,
    switchChainId,
  };
}
