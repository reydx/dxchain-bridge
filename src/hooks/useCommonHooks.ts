import { useState, useEffect } from 'react';
import { useModel } from 'umi';
import { getBalance } from '@/api/DX';
import { formatCurrency } from '@/utils/currency';
import { getDxChainHttpWeb3, getEthChainHttpWeb3 } from '@/utils/web3';
import { useWeb3React } from '@web3-react/core';
import { EthChainId, isETHChain, DxChainId } from '@/constants/chainId';
import { SerializedToken } from '@/models/useGetState';

export default function useCommonHooks() {
  const { chainId, library, account } = useWeb3React();
  const [showBalanceKey, setShowBalanceKey] = useState<
    'nativeBalance' | 'wrappedBalance'
  >('nativeBalance');
  const { Data } = useModel('useGetState', (data) => data);

  const getChainTokenBalance = async (token: SerializedToken, cid?: number) => {
    let balance = '0';
    const id = cid || chainId;

    try {
      if (isETHChain(cid)) {
        switch (token.assetName) {
          case 'ETH':
            if (account)
              balance = await getEthChainHttpWeb3().eth.getBalance(account);
            break;
          default:
            balance = await getBalance(
              account,
              token.nativeContractAddress,
              id,
            );
            break;
        }
      } else {
        switch (token.assetName) {
          case 'HT':
            if (account)
              balance = await getDxChainHttpWeb3().eth.getBalance(account);
            break;
          default:
            balance = await getBalance(
              account,
              token.wrappedContractAddress,
              id,
            );
            break;
        }
      }
    } catch (error) {
      console.log(`error`, error);
    }
    return formatCurrency(balance, 6);
  };

  const getAllChainTokenBalance = async (token: SerializedToken) => {
    const [n, w] = await Promise.all([
      getChainTokenBalance(token, EthChainId),
      getChainTokenBalance(token, DxChainId),
    ]);
    return {
      nativeBalance: n,
      wrappedBalance: w,
    };
  };

  const getBalanceKey = () => {
    const v = isETHChain(chainId) ? 'nativeBalance' : 'wrappedBalance';
    setShowBalanceKey(v);
    return v;
  };

  useEffect(() => {
    getBalanceKey();
  }, [chainId]);

  return {
    showBalanceKey,
    getChainTokenBalance,
    getAllChainTokenBalance,
  };
}
