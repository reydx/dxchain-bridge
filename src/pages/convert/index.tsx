import React from 'react';
import { Button } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import switchImg from '@/assets/transfer/switch.png';
import ErrorComponent from '@/components/Error';
import Note from '@/components/Note';

import './index.less';

const SwitchNetwork = () => {
  return (
    <div className="switch-network">
      <div>Switch to the Avalanche Network to convert your AEB tokens</div>
      <div>
        <img src={switchImg} alt="" />
        <div>Switch</div>
      </div>
    </div>
  );
};

export default function Convert() {
  const history = useHistory();
  const flag = true;

  return (
    <div className="convert">
      <Note
        msg={'Note: Transferring ETH over the bridge requires two transactions'}
      />
      <div className="box">
        <div className="title">
          Upgrade your AEB 1INCH Assets
          <CloseOutlined className="icon" onClick={() => history.push('/')} />
        </div>

        {flag ? <SwitchNetwork /> : <div>123</div>}
      </div>

      <ErrorComponent
          errMsg={'Insufficient balance to cover gas costs. Please add ETH.'}
        />

        <Button type="primary" block className="upgrade-btn">
          Upgrade
        </Button>

        <div className="bottom">Proof of assets <RightOutlined className="icon" />
        </div>
    </div>
  );
}
