import React from 'react';
import Note from '@/components/Note';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import Progress from '@/components/Progress';
import './index.less';
import { useHistory } from 'umi';

export default function Wrapping() {
  const history = useHistory();
  return (
    <div className="wrapping-page">
      <Note
        msg={'Transferring ETH over the bridge requires two transactions'}
      />

      <div className="box">
        <div className="title">Wrapping your ETH</div>
        <div>
          Waiting for{' '}
          <span onClick={() => history.push('/transaction')}>Confirmation</span>
        </div>
        <Progress />
      </div>
    </div>
  );
}
