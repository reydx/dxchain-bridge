import React, { FC, useEffect } from 'react';
import Context from './walletContext';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/utils/connectors';
import { useHistory } from 'umi';

const WalletProvider: FC = ({ children }) => {
  const history = useHistory();
  const { active, error, activate, deactivate } = useWeb3React();

  const login = async () => {
    const { ethereum }: any = window;
    if (ethereum) {
      try {
        await activate(injected);
      } catch (error) {
        console.log(`error`, error);
      }
    }
  };

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized: any) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          history.push('/login');
        });
      }
    });
  }, []);

  useEffect(() => {
    const { ethereum }: any = window;
    if (ethereum && ethereum.on && active) {
      const handleConnect = () => {
        console.log("Handling 'connect' event");
        activate(injected);
      };
      const handleChainChanged = (chainId: any) => {
        console.log("Handling 'chainChanged' event with payload", chainId);
        activate(injected);
      };
      const handleAccountsChanged = (accounts: string | any[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts);
        if (accounts.length > 0) {
          activate(injected);
        }
      };
      const handleNetworkChanged = (networkId: any) => {
        console.log("Handling 'networkChanged' event with payload", networkId);
        activate(injected);
      };

      ethereum.on('connect', handleConnect);
      ethereum.on('chainChanged', handleChainChanged);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect);
          ethereum.removeListener('chainChanged', handleChainChanged);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', handleNetworkChanged);
        }
      };
    }
  }, [active, error, activate]);

  return (
    <Context.Provider
      value={{
        login,
        logout: () => {},
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default WalletProvider;
