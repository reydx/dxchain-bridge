import React from 'react';
import { Button, Input } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import ErrorComponent from '@/components/Error';
import { TokenImage } from '@/components/TokenImage';
import EthereumImg from '@/assets/transfer/ethereum.png';
import switchImg from '@/assets/transfer/switch.png';
import { useHistory } from 'umi';
import './index.less';

export default function Transfer() {
  const history = useHistory();

  const go = (path: string) => history.push(path);


  return (
    <div className="transfer">
      <div className="from-box">
        <div className="title">From</div>
        <div className="logo">
          <img src={EthereumImg} alt="" />
          Ethereum
        </div>
        <div className="select" onClick={() => go('/select')}>
          <TokenImage />
          <DownOutlined className="icon" />
        </div>
        <div className="num">
          <Input type="number" />
          <span>Max</span>
        </div>

        <div className="details">
          <div className="left">
            <div>Estimated value</div>
            <div>~US$0.00</div>
          </div>
          <div className="right">
            <div>Available balance</div>
            <div>3.26BTC</div>
          </div>
        </div>

        <div className="switch">
          <img src={switchImg} alt="" />
          <div>Switch</div>
        </div>
      </div>

      <div className="to-box">
        <div className="title">To</div>
        <div className="to-details">
          <div>
            <TokenImage />
          </div>
          <div>
            <span>Available balance</span>
            <span>324,542,65 DX</span>
          </div>
        </div>
        <div className="fee">Estimated transfer fee: ~{9999999} DX</div>
      </div>

      <ErrorComponent
        errMsg={'Insufficient balance to cover gas costs. Please add ETH.'}
      />

      <Button type="primary" block className="transfer-btn" onClick={() => go('/confirm')}>
        Transfer
      </Button>

      <div className="bottom">
        <div onClick={() => go('/convert')}>
          Convert AEB assets
          <RightOutlined className="icon" />
        </div>
        <div onClick={() => go('/proof-of-assets')}>
          Proof of assets
          <RightOutlined className="icon" />
        </div>
      </div>
    </div>
  );
}
