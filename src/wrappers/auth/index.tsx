import React from 'react';
import { Redirect } from 'umi';
import { useWeb3React } from '@web3-react/core'
import { useInactiveListener } from '../wallet/WalletHooks';

const Auth: React.FC = ({ children }) => {
  const { account } = useWeb3React();

  if (account) {
    return <>{children}</>;
  } else {
    return (
      <>
        {children}
        <Redirect to="/login" />
      </>
    );
  }
};

export default Auth;
