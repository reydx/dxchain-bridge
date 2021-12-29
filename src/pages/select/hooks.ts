import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { SerializedToken } from '@/models/useGetState';
import { useModel } from 'umi';
import useBalance from '@/hooks/useBalance';
import { isETHChain } from '@/constants/chainId';

export default function selectHooks() {
  const { chainId } = useWeb3React();
  const { tokens, setTokens } = useModel('useGetState', (data) => data);
  const { getAllChainTokenBalance } = useBalance();
  const [searchTokenList, setSearchTokenList] = useState<SerializedToken[]>([]);

  const getAllBalance = async () => {
    setSearchTokenList([...tokens]);
    const copy = [...tokens];
    for (const key in copy) {
      await getAllChainTokenBalance(copy[key]).then((res) => {
        copy[key] = {
          ...copy[key],
          ...res,
        };
      });
    }
    setTokens([...copy]);
    setSearchTokenList([...copy]);
  };

  const searchChange = (v: { target: { value: string } }) => {
    const searchValue = v.target.value.toLocaleUpperCase();
    const filterList = tokens.filter((item) => {
      const address = isETHChain(chainId)
        ? item.nativeContractAddress
        : item.wrappedContractAddress;
      if (searchValue && chainId && searchValue[0] === '0') {
        return address.toLocaleUpperCase().indexOf(searchValue) === 0;
      } else {
        return item.assetName.toLocaleUpperCase().indexOf(searchValue) === 0;
      }
    });
    setSearchTokenList([...filterList]);
  };

  return {
    searchTokenList,
    searchChange,
    getAllBalance,
  };
}
