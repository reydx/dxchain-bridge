import { useState, useCallback } from 'react';

export default function useSelectModel() {
  const [tokenList, setTokenList] = useState([
    {
      name: 'USDT2',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 99999,
    },
    {
      name: 'AAVE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },
    {
      name: '1asd',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },
    {
      name: 'AA3VE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },
    {
      name: 'AA4VE2',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },
    {
      name: 'AA4VE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },
  ]);

  const get = useCallback(() => {
    console.log(`11`, 11);
  }, []);

  return {
    tokenList,
    get,
  };
}
