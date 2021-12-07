import walletContext from '@/wrappers/wallet/walletContext';
import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';

const useAuth = () => {
  return { ...useContext(walletContext), ...useWeb3React() };
};

export default useAuth;
