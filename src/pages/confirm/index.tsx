import React from 'react';
import Note from '@/components/Note';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import { useHistory } from 'umi';
import './index.less';

export default function Confirm() {
  const history = useHistory();
  return (
    <div className="confirm-page">
      <Note
        msg={'Transferring ETH over the bridge requires two transactions'}
      />

      <div className="box" onClick={() => history.push('/wrapping')}>
        <div className="title">Wrapping your ETH</div>
        <img src={meatMaskLogoW} alt="" />
        <div>
          Your native asset needs to be wrapped to transfer it through the
          bridge
        </div>
        <div>Please confirm it in MetaMask</div>
      </div>
    </div>
  );
}
