import React from 'react';
import Header from '@/components/Header';
import { Web3ReactProvider } from '@web3-react/core';
import './index.less';
import web3 from 'web3';
import WalletProvider from '@/wrappers/wallet';
import { provider } from 'web3-core';

function getLibrary(provider: provider) {
  const library = new web3(provider);
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
