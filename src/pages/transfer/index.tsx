import { Button, Input } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import ErrorComponent from '@/components/Error';
import { TokenImage } from '@/components/TokenImage';
import { useHistory, useModel } from 'umi';
import switchImg from '@/assets/transfer/switch.png';
import ChianImage from '@/components/ChainImage';
import useTransfer from '@/hooks/useTransfer';
import TransferHooks from './hooks';
import './index.less';
import useCommonHooks from '@/hooks/useCommonHooks';
import { eight, formatCurrency } from '@/utils/currency';

export default function Transfer() {
  const { searchToken } = useModel('useSelectModel', (data) => data);
  const {
    input,
    chainArr,
    switchChainId,
    inputChange,
    maxHandle,
    fromData,
    toData,
  } = useModel('useTransferModel', (data) => data);
  const { transaction, loading } = useTransfer();
  const { routerPush } = useCommonHooks();
  const { inputDisabled } = TransferHooks();

  return (
    <div className="transfer">
      <div className="from-box">
        <div className="title">From</div>
        <div className="logo">
          <ChianImage chainId={chainArr[0]} />
        </div>
        <div
          className="select"
          onClick={() => {
            routerPush('/select');
            inputChange('');
          }}
        >
          <TokenImage token={searchToken} />
          <DownOutlined className="icon" />
        </div>
        <div className="num">
          <Input
            value={input}
            type="number"
            onChange={(v) => inputChange(v.target.value)}
          />
          <span onClick={() => maxHandle(fromData)}>Max</span>
        </div>

        <div className="details">
          <div className="left">
            <div>Estimated value</div>
            <div>~US${formatCurrency(fromData.usd.times(input || 0), 2)}</div>
          </div>
          <div className="right">
            <div>Available balance</div>
            <div>
              {formatCurrency(fromData.availableBalance, 6)}
              {searchToken.assetName}
            </div>
          </div>
        </div>

        <div className="switch" onClick={switchChainId}>
          <img src={switchImg} alt="" />
          <div>Switch</div>
        </div>
      </div>

      <div className="to-box">
        <div className="title">To</div>
        <div className="to-details">
          <div>
            <ChianImage chainId={chainArr[1]} />
          </div>
          <div>
            <span>Available balance</span>
            <span>
              {formatCurrency(toData.availableBalance, 6)}
              {searchToken.assetName}
            </span>
          </div>
        </div>
        <div className="fee">Estimated transfer fee: ~{0.0009} WETH</div>
      </div>

      <ErrorComponent />

      <Button
        block
        type="primary"
        loading={loading}
        onClick={transaction}
        disabled={inputDisabled}
        className="transfer-btn"
      >
        Transfer
      </Button>

      <div className="bottom">
        <div onClick={() => routerPush('/convert')}>
          Convert AEB assets
          <RightOutlined className="icon" />
        </div>
        <div onClick={() => routerPush('/proof')}>
          Proof of assets
          <RightOutlined className="icon" />
        </div>
      </div>
    </div>
  );
}
