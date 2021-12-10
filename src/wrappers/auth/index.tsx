import React, { useEffect } from 'react';
import { Redirect } from 'umi';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'umi';

const Auth: React.FC = ({ children }) => {
  const { account } = useWeb3React();
  const history = useHistory();

  useEffect(() => {
    if (!account) history.push('/login');
  }, [account]);

  return (
    <>
      {children}
      {/* {!account && <Redirect to={{
        pathname: '/login',

      }} />} */}
    </>
  );
};

export default Auth;
