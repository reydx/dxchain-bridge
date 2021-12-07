import { useState, useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { SerializedToken, TokensConfig } from '@/constants/tokens';
import BigNumber from 'bignumber.js';
import { formatCurrency } from '@/utils/currency';

export default function selectHooks() {
  const { chainId, library } = useWeb3React();
  const [tokenList, setTokenList] = useState<SerializedToken[]>([]);

  const getAllTokens = useCallback(() => {
    let defaultTokens: SerializedToken[] = [];
    if (chainId) {
      defaultTokens = Object.keys(TokensConfig).reduce(
        (pre: SerializedToken[], current) => {
          const symbol = TokensConfig[current];
          symbol.address = symbol.addressConfig[chainId];
          return [...pre, symbol];
        },
        [],
      );
      setTokenList(defaultTokens);
      getBalance(defaultTokens);
    }

    return defaultTokens;
  }, [chainId]);

  const getBalance = async (list: SerializedToken[]) => {
    const copy = [...list];
    for (const key in list) {
      await library.eth.getBalance(list[key].address).then((res: string) => {
        copy[key] = {
          ...copy[key],
          balance: `${formatCurrency(res, 6)}`,
        };
      });
    }
    setTokenList(copy);
  };

  useEffect(() => {
    if (chainId) {
      getAllTokens();
    }
  }, [chainId]);

  return {
    tokenList,
    getAllTokens,
  };
}
