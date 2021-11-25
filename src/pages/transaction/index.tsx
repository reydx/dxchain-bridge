import React from 'react';
import { TokenImage } from '@/components/TokenImage';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import './index.less';
import Progress from '@/components/Progress';

export default function Transaction() {
  return (
    <div className="transaction-page">
      <div className="title">Transaction Status</div>
      <div className="amount-transferred">
        <div className="t-header">
          <div>Token</div>
          <div>Amount transferred</div>
          <div>Add token</div>
        </div>
        <div className="t-body">
          <div>
            <TokenImage />
          </div>
          <div>
            <div>0.24 WETH</div>
            <div>~US$876.78</div>
          </div>
          <div>
            <img src={meatMaskLogoW} alt="" />
          </div>
        </div>
      </div>

      <div className="content">
        <div className="t-header">
          <div>Network</div>
          <div>Timer</div>
          <div>Cost of Gas</div>
        </div>
        <div className="t-body">
          <div className="item">
            <div className="t-note">
              Waiting for <span>Confirmation</span>
            </div>
            <div className="item-content">
              <div>
                <TokenImage />
              </div>
              <div>
                <Progress showTime />
              </div>
              <div>
                <div>0.4455624 WETH</div>
                <div>~US$876.78</div>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="t-note">Waiting for Ethereum</div>
            <div className="item-content">
              <div>
                <TokenImage />
              </div>
              <div>
                <Progress showTime />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
