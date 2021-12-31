import { useState, useEffect } from 'react';
import bridgeSeeting from '@/constants/abi/bridge_settings_1.json';
import { useModel } from 'umi';
import BigNumber from 'bignumber.js';

export interface SerializedToken {
  asset: string;
  assetName: string;
  chainlinkFeedAddress: string;
  denomination: number;
  nativeContractAddress: string;
  nativeNetwork: 'ethereum' | string;
  nativeBalance?: BigNumber;
  offboardFeeDollars: number;
  onboardFeeDollars: number;
  tokenName: string;
  wrappedContractAddress: string;
  wrappedNetwork: 'dxchain' | string;
  wrappedBalance?: BigNumber;
}

interface SerializedTokenObjects {
  [symbol: string]: SerializedToken;
}

export default function useGetState() {
  const { setSearchToken } = useModel('useSelectModel', (m) => m);
  const [Data, setData] = useState({ ...bridgeSeeting });
  const [tokens, setTokens] = useState<SerializedToken[]>([]);

  const fetchData = async () => {
    try {
      const [r1, r2, r3] = await Promise.all([
        (await fetch(FETCH_URLS[0])).json(),
        (await fetch(FETCH_URLS[1])).json(),
        (await fetch(FETCH_URLS[2])).json(),
      ]);

      const r1LastSennBlock =
        r1.nonCritical.networkViews.ethereum.lastSeenBlock;
      const r2LastSennBlock =
        r2.nonCritical.networkViews.ethereum.lastSeenBlock;
      const r3LastSennBlock =
        r3.nonCritical.networkViews.ethereum.lastSeenBlock;

      const m = r1LastSennBlock > r2LastSennBlock ? r1 : r2;
      const max =
        m.nonCritical.networkViews.ethereum.lastSeenBlock > r3LastSennBlock
          ? m
          : r3;

      setData(max);
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

  const tokenAddressToTokenInfo = (address: string): any => {
    if (!address) return {};
    const currentToken = address.toLocaleUpperCase();
    const result = tokens.filter((item) => {
      const n = item.nativeContractAddress.toLocaleUpperCase();
      const w = item.wrappedContractAddress.toLocaleUpperCase();
      return n === currentToken || w === currentToken;
    });
    return result.length ? result[0] : {};
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchData();
    }, 15000);
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
    tokenAddressToTokenInfo,
  };
}
