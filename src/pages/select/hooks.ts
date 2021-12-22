import { useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatCurrency } from '@/utils/currency';
import { getBalance } from '@/api/DX';
import { SerializedToken } from '@/models/useGetState';
import { useModel } from 'umi';
import useCommonHooks from '@/hooks/useCommonHooks';
import { isETHChain } from '@/constants/chainId';

export default function selectHooks() {
  const { chainId, library, account } = useWeb3React();
  const { tokens, setTokens } = useModel('useGetState', (data) => data);
  const { getAllChainTokenBalance } = useCommonHooks();
  const [searchTokenList, setSearchTokenList] = useState<SerializedToken[]>([]);

  const getAllBalance = async () => {
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
