import { Button, Input } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import ErrorComponent from '@/components/Error';
import { TokenImage } from '@/components/TokenImage';
import { useHistory, useModel } from 'umi';
import switchImg from '@/assets/transfer/switch.png';
import ChianImage from '@/components/ChainImage';
import { useWeb3React } from '@web3-react/core';
import TransferHooks from './hooks';
import './index.less';

export default function Transfer() {
  const history = useHistory();
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
  const {} = TransferHooks();

  const go = (path: string) => history.push(path);

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
            go('/select');
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
            onChange={(v) => inputChange(v.target.value, fromData)}
          />
          <span onClick={() => maxHandle(fromData)}>Max</span>
        </div>

        <div className="details">
          <div className="left">
            <div>Estimated value</div>
            <div>~US${fromData.usd}</div>
          </div>
          <div className="right">
            <div>Available balance</div>
            <div>
              {fromData.availableBalance} {searchToken.assetName}
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
              {toData.availableBalance} {searchToken.assetName}
            </span>
          </div>
        </div>
        <div className="fee">Estimated transfer fee: ~{9999999} WETH</div>
      </div>

      <ErrorComponent
        errMsg={'Insufficient balance to cover gas costs. Please add ETH.'}
      />

      <Button
        type="primary"
        block
        className="transfer-btn"
        onClick={() => go('/confirm')}
      >
        Transfer
      </Button>

      <div className="bottom">
        <div onClick={() => go('/convert')}>
          Convert AEB assets
          <RightOutlined className="icon" />
        </div>
        <div onClick={() => go('/proof')}>
          Proof of assets
          <RightOutlined className="icon" />
        </div>
      </div>
    </div>
  );
}
