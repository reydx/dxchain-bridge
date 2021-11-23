import React, { FC, useState, useCallback, useEffect } from 'react';
import Context from './walletContext';
import { useWeb3React } from '@web3-react/core';
import { injected } from '@/utils/connectors';
import { useHistory } from 'umi';
import { useInactiveListener } from './WalletHooks';



const WalletProvider: FC = ({ children }) => {
  const history = useHistory();
  const { active, error, activate } = useWeb3React();


  const login = async () => {
    const { ethereum }: any = window;
    console.log(`ethereum`, ethereum);
    if (ethereum) {
      try {
        await activate(injected)
        .finally(() => {
          // history.push('/')
        });
      } catch (error) {
        console.log(`error`, error);
      }
    }
  };

  useEffect(() => {
    injected.isAuthorized()
    .then((isAuthorized: any) => {
      if (isAuthorized) {
        activate(injected, undefined, true)
        .catch(() => {
          history.push('/login')
        });
      }
    });
  }, []);




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
