import { useState, useEffect } from 'react';
import bridgeSeeting from '@/constants/abi/bridge_settings_1.json';
import { useModel } from 'umi';
import BigNumber from 'bignumber.js';
import { DXCHAINID, ETHCHAINID, isETHChain } from '@/constants/chainId';
import { ethereum } from '@/utils/web3';
import Web3 from 'web3';
import { DEFAULT_TOKEN } from '@/constants/token';

export interface SerializedToken {
  asset: string;
  assetName: string;
  chainlinkFeedAddress: string;
  denomination: number;
  nativeContractAddress: string;
  nativeNetwork: 'ethereum' | string;
  nativeBalance?: BigNumber;
  nativeTotalSupply?: BigNumber;
  nativeBalanceOf?: BigNumber;
  offboardFeeDollars: number;
  onboardFeeDollars: number;
  tokenName: string;
  wrappedContractAddress: string;
  wrappedNetwork: 'dxchain' | string;
  wrappedBalance?: BigNumber;
  wrappedTotalSupply?: BigNumber;
}

interface SerializedTokenObjects {
  [symbol: string]: SerializedToken;
}

export default function useGetState() {
  const { searchToken, setSearchToken } = useModel('useSelectModel', (m) => m);
  const [Data, setData] = useState({ ...bridgeSeeting });
  const [tokens, setTokens] = useState<SerializedToken[]>([]);

  const fetchData = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        fetch(FETCH_URLS[0], { cache: 'no-store' }),
        fetch(FETCH_URLS[1], { cache: 'no-store' }),
        fetch(FETCH_URLS[2], { cache: 'no-store' }),
      ]);
      const r1 = await res1.json();
      const r2 = await res2.json();
      const r3 = await res3.json();

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
      // console.log(`max`, max)
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
    if (!searchToken) setSearchToken([...defaultTokens][0]);
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

  const transactionChainId = (token: SerializedToken, toAddress: string) => {
    if (token.nativeContractAddress.toUpperCase() === toAddress.toUpperCase()) {
      return ETHCHAINID[REACT_NET];
    } else {
      return DXCHAINID[REACT_NET];
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(id);
  }, [setData]);

  useEffect(() => {
    const chainId = Web3.utils.toNumber(ethereum.chainId);
    const isETH = isETHChain(chainId);
    if (isETH) {
      getTokensList({
        ...Data?.critical?.assets,
        ...DEFAULT_TOKEN,
      });
    } else {
      getTokensList(Data?.critical?.assets || {});
    }
  }, [Data, ethereum.chainId]);

  // useEffect(() => {
  //   const chainId = Web3.utils.toNumber(ethereum.chainId);
  //   const isETH = isETHChain(chainId);
  //   console.log(`tokens`, tokens)
  //   if (!isETH && tokens.length && searchToken.assetName === 'ETH') {
  //     setSearchToken(tokens[0])
  //   }
  // }, [ethereum.chainId]);

  return {
    Data,
    tokens,
    setTokens,
    fetchData,
    transactionChainId,
    tokenAddressToTokenInfo,
  };
}
