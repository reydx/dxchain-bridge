import React, { useEffect } from 'react';
// import { Redirect } from 'umi';
// import { useWeb3React } from '@web3-react/core'

const Auth: React.FC = ({ children }) => {
  // const { account } = useWeb3React();
    // console.log(`account`, account)
    return (
      <>
        {children}
        {/* {!account && <Redirect to="/login" />} */}
      </>
    );
};

export default Auth;
