import React from 'react';
import { useModel } from 'umi';
import { TokenImage } from '@/components/TokenImage';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import Progress from '@/components/Progress';
import { useWeb3React } from '@web3-react/core';
import ChianImage from '@/components/ChainImage';
import transactionHooks from './hooks';
import './index.less';
import { formatCurrency } from '@/utils/currency';

export default function Transaction() {
  const { info, percent1, percent2, timeFirst, timeSecond }: any =
    transactionHooks();

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
            <TokenImage token={info.token} />
          </div>
          <div>
            <div>
              {formatCurrency(info.ammount)} {info.token.assetName}
            </div>
            <div>~US${formatCurrency(info.price, 2)}</div>
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
                <ChianImage chainId={info.tChainId} />
              </div>
              <div>
                <Progress percent={percent1} time={timeFirst} />
              </div>
              <div>
                <div>
                  {formatCurrency(info.gas, 7)} {info.token.assetName}
                </div>
                <div>~US${formatCurrency(info.gasPrice, 2)}</div>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="t-note">Waiting for Ethereum</div>
            <div className="item-content">
              <div>
                <ChianImage chainId={info.oChainId} />
              </div>
              <div>
                <Progress percent={percent2} time={timeSecond} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
