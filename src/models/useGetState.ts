import { useState, useEffect } from 'react';
import { useModel } from 'umi';

export interface SerializedToken {
  asset: string;
  assetName: string;
  chainlinkFeedAddress: string;
  denomination: number;
  nativeContractAddress: string;
  nativeNetwork: 'ethereum';
  nativeBalance?: string;
  offboardFeeDollars: number;
  onboardFeeDollars: number;
  tokenName: string;
  wrappedContractAddress: string;
  wrappedNetwork: 'dxchain';
  wrappedBalance?: string;
}

interface SerializedTokenObjects {
  [symbol: string]: SerializedToken;
}

export default function useGetState() {
  const { setSearchToken } = useModel('useSelectModel', (m) => m);
  const [Data, setData] = useState({
    critical: { assets: {} },
    nonCritical: {
      chainlinkDxUsdFeedAddress: '',
      chainlinkEthUsdFeedAddress: '',
    },
  });
  const [tokens, setTokens] = useState<SerializedToken[]>([]);

  const fetchData = async () => {
    try {
      const res = await Promise.all([
        (await fetch(FETCH_URLS[0])).json(),
        (await fetch(FETCH_URLS[1])).json(),
        (await fetch(FETCH_URLS[2])).json(),
      ]);
      setData(res[0]);
    } catch (error) {
      console.error('Unable to fetch data:', error);
    }
  };

  const getTokensList = (TokensConfig: SerializedTokenObjects) => {
    const defaultTokens = Object.keys(TokensConfig).reduce(
      (pre: SerializedToken[], current) => {
        const symbol = { ...TokensConfig[current] };
        return [...pre, symbol];
      },
      [],
    );
    setTokens([...defaultTokens]);
    setSearchToken([...defaultTokens][0]);
    return defaultTokens;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(id);
  }, [setData]);

  useEffect(() => {
    getTokensList(Data?.critical?.assets || {});
  }, [Data]);

  return {
    Data,
    tokens,
    setTokens,
    fetchData,
  };
}
