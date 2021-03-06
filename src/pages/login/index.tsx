import { useEffect } from 'react';
import { useHistory } from 'umi';
import { Button } from 'antd';
import metaMaskImg from '@/assets/login/metaMask.png';
import ErrorComponent from '@/components/Error';
import useAuth from '@/hooks/useAuth';
import './index.less';
import { useWeb3React } from '@web3-react/core';

export default function Login() {
  const { account } = useWeb3React();
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (account) {
      history.goBack();
      if (history.location.pathname === '/login') {
        history.push('/');
      }
    }
  }, [account]);

  return (
    <div className="login">
      <div className="container">
        <span>Login</span>
        <div className="mask">
          <img src={metaMaskImg} alt="" />
          <div className="center">
            <div className="title">MetaMask</div>
            <div className="desc">Connect using your browser wallet</div>
          </div>
          <Button
            type="primary"
            className="connect-button"
            onClick={auth.login}
          >
            Connect
          </Button>
        </div>

        <ErrorComponent errMsg={auth.error?.message} />

        <div className="download">
          Don't have a wallet?
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          >
            Download here
          </a>
        </div>
      </div>
    </div>
  );
}
