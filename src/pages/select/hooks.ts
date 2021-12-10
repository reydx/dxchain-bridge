import { useState, useCallback, useEffect, SetStateAction } from 'react';
import { useWeb3React } from '@web3-react/core';
import { SerializedToken, tokens, TokensConfig } from '@/constants/tokens';
import { formatCurrency } from '@/utils/currency';
import { getBalance } from '@/api/DX';

export default function selectHooks() {
  const { chainId, library, account } = useWeb3React();
  const [defaultTokenList, setDefaultTokenList] = useState<SerializedToken[]>(
    [],
  );
  const [searchTokenList, setSearchTokenList] = useState<SerializedToken[]>([]);

  const getAllTokens = useCallback(
    (setSearchList = false) => {
      const defaultTokens = tokens(chainId);
      setDefaultTokenList(defaultTokens);
      getAllBalance(defaultTokens, setSearchList);
      return defaultTokens;
    },
    [chainId],
  );

  const getAllBalance = async (
    list: SerializedToken[],
    setSearchList = false,
  ) => {
    const copy = [...list];
    for (const key in list) {
      switch (list[key].symbol) {
        case 'ETH':
          await library.eth.getBalance(account).then((res: string) => {
            copy[key] = {
              ...copy[key],
              balance: `${formatCurrency(res, 6)}`,
            };
          });
          break;
        default:
          if (account)
            await getBalance(account, list[key].address).then((res) => {
              copy[key] = {
                ...copy[key],
                balance: `${formatCurrency(res, 6)}`,
              };
            });
          break;
      }
    }
    setDefaultTokenList(copy);
    if (setSearchList) setSearchTokenList(copy);
  };

  const searchChange = (v: { target: { value: string } }) => {
    const searchValue = v.target.value.toLocaleUpperCase();
    const filterList = defaultTokenList.filter((item) => {
      if (searchValue && searchValue[0] === '0' && item.address) {
        return item.address.toLocaleUpperCase().indexOf(searchValue) === 0;
      } else {
        return item.symbol.toLocaleUpperCase().indexOf(searchValue) === 0;
      }
    });
    setSearchTokenList([...filterList]);
  };

  return {
    defaultTokenList,
    searchTokenList,
    getAllTokens,
    searchChange,
  };
}
