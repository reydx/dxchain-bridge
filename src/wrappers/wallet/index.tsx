import React, { FC, useState, useCallback, useEffect } from 'react';
import Context from './walletContext';
import { useHistory } from 'umi';

const WalletProvider: FC = ({ children }) => {
  const history = useHistory();

  return (
    <Context.Provider
      value={{
        login: () => {},
        logout: () => {},
        openWallet: () => {},
        status: '',
        account: '',
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default WalletProvider;
