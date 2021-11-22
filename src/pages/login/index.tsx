import './index.less';
import { Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import metaMaskImg from '@/assets/login/metaMask.png';
import useAuth from '@/wrappers/wallet/WalletHooks';

export default function Login() {
  const auth = useAuth()
  console.log(`auth`, auth)
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
          <Button type="primary" className="connect-button" onClick={auth.login}>
            Connect
          </Button>
        </div>

        <div className="error">
          <ExclamationCircleOutlined className="icon"/> Please select Ethereum Mainnet in your
          wallet
        </div>

        <div className="download">
          Don't have a wallet?
          <a target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">Download here</a>
        </div>
      </div>
    </div>
  );
}
