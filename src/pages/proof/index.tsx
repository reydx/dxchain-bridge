import React from 'react';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
import { TokenImage } from '@/components/TokenImage';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import copyImg from '@/assets/common/copy.png';
import linkImg from '@/assets/common/link.png';
import shareImg from '@/assets/common/share.png';
import { getCenterSubStr } from '@/utils/common';
import { useHistory } from 'umi';
import './index.less';

type InfoTagProps = {
  info: {
    num: number;
    address: string;
  };
  tTitle: string;
  symbolName: string;
  showLink?: boolean;
  showMetaMask?: boolean;
};

const InfoTag = (props: InfoTagProps) => {
  const { info, showLink, showMetaMask, tTitle, symbolName } = props;
  return (
    <div className="info-tag">
      <div className="t-title">{tTitle}</div>
      <div>
        <div className="t-left">
          <div>
            <div>
              {info.num} {symbolName}
            </div>
            <div>{getCenterSubStr(info.address)}</div>
          </div>
          <div>
            {showMetaMask && (
              <img className="meatMask-logo" src={meatMaskLogoW} alt="" />
            )}
            <img className="copy" src={copyImg} alt="" />
            <a href="" className="share">
              <img src={shareImg} alt="" />
            </a>
          </div>
        </div>
        {showLink && (
          <a href="" className="link">
            <img src={linkImg} alt="" />
          </a>
        )}
      </div>
    </div>
  );
};

export default function Proof() {
  const history = useHistory();
  const list = [
    {
      symbol: 'USDT',
      address: '',
      proofOfAssets: {
        num: 123213.123,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
      wrappedToken: {
        num: 123213.213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
      swapSupply: {
        num: 123213.22,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
    },
    {
      symbol: 'AAVE',
      address: '',
      proofOfAssets: {
        num: 123213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
      wrappedToken: {
        num: 123213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
      swapSupply: {
        num: 123213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
    },
    {
      symbol: 'AAVE2',
      address: '',
      proofOfAssets: {
        num: 123213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
      wrappedToken: {
        num: 123213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
      swapSupply: {
        num: 123213,
        address: '0xe78388b41232132132132143243246b9ab0e9d0',
      },
    },
  ];
  return (
    <div className="proof">
      <div className="title">
        <LeftOutlined onClick={() => history.goBack()} />
        <div>Proof of Assets</div>
        <CloseOutlined onClick={() => history.push('/')} />
      </div>
      <div className="note">
        You can view all on-chain behaviors of AVAX token and locked native
        token assets on this page
      </div>

      <ul>
        {list.map((item) => {
          return (
            <li key={item.symbol}>
              <div className="right">
                <TokenImage />
                <InfoTag
                  tTitle="Proof of Asset"
                  info={item.proofOfAssets}
                  symbolName={item.symbol}
                  showLink
                  showMetaMask
                />
              </div>
              <div className="left">
                <InfoTag
                  tTitle="Wrapped Token"
                  symbolName={`${item.symbol}.e`}
                  info={item.wrappedToken}
                />
                <InfoTag
                  tTitle="Wrapped Token"
                  symbolName={`${item.symbol}.e`}
                  info={item.swapSupply}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
