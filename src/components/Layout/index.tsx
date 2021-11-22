import React from 'react';
import Header from '@/components/Header';
import { Web3ReactProvider } from '@web3-react/core';
import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from '@ethersproject/providers';
import { Web3Provider } from '@ethersproject/providers';
import './index.less';
import WalletProvider from '@/wrappers/wallet';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Layout: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
      <div className="dx-layout">
        <Header />
        <div className="dx-container">{children}</div>
      </div>
      </WalletProvider>
    </Web3ReactProvider>
  );
};

export default Layout;
