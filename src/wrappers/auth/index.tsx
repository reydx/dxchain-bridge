import React from 'react';
import { Redirect } from 'umi';

const Auth: React.FC = ({ children }) => {

  if (false) {
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
