import React from 'react';
import { LeftOutlined, CloseOutlined } from '@ant-design/icons';
import { TokenImage } from '@/components/TokenImage';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import copyImg from '@/assets/common/copy.png';
import linkImg from '@/assets/common/link.png';
import shareImg from '@/assets/common/share.png';
import { copy, getCenterSubStr } from '@/utils/common';
import { useHistory, useModel } from 'umi';
import './index.less';
import proofHooks from './hooks';
import { formatCurrency } from '@/utils/currency';
import { networkConf } from '@/constants/network';
import { DxChainId, EthChainId } from '@/constants/chainId';
import useMetaMask from '@/hooks/useMetaMask';
import { SerializedToken } from '@/models/useGetState';

type InfoTagProps = {
  info: {
    totalSupply: string;
    address: string;
  };
  tTitle: string;
  symbolName: string;
  showLink?: boolean;
  showMetaMask?: boolean;
  token?: SerializedToken;
  href: string;
};

const InfoTag = (props: InfoTagProps) => {
  const { info, showLink, showMetaMask, tTitle, symbolName, token, href } =
    props;
  const { metaMaskAddToken } = useMetaMask();

  return (
    <div className="info-tag">
      <div className="t-title">{tTitle}</div>
      <div>
        <div className="t-left">
          <div>
            <div>
              {info.totalSupply} {symbolName}
            </div>
            <div>{getCenterSubStr(info.address)}</div>
          </div>
          <div>
            {showMetaMask && (
              <img
                className="meatMask-logo"
                src={meatMaskLogoW}
                alt=""
                onClick={() =>
                  token &&
                  metaMaskAddToken(
                    { ...token, address: token?.nativeContractAddress },
                    false,
                  )
                }
              />
            )}
            <img
              className="copy"
              src={copyImg}
              alt=""
              onClick={() => copy(info.address)}
            />
            <a href={href} className="share" target="_blank">
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
  const { proofList } = proofHooks();
  const { Data } = useModel('useGetState', (data) => data);

  return (
    <div className="proof">
      <div className="title">
        <LeftOutlined onClick={() => history.goBack()} />
        <div>Proof of Assets</div>
        <CloseOutlined onClick={() => history.push('/')} />
      </div>
      <div className="note">
        You can view all on-chain behaviors of DX token and locked native token
        assets on this page
      </div>

      <ul>
        {proofList.map((item) => {
          return (
            <li key={item.assetName}>
              <div className="right">
                <TokenImage token={item} />
                <InfoTag
                  tTitle="Proof of Asset"
                  symbolName={item.assetName}
                  showLink
                  showMetaMask
                  token={item}
                  info={{
                    totalSupply: formatCurrency(item.nativeBalanceOf),
                    address: Data.critical.walletAddress.ethereum,
                  }}
                  href={`${networkConf[EthChainId].blockExplorerUrls}/address/${Data.critical.walletAddress.ethereum}`}
                />
              </div>
              <div className="left">
                <InfoTag
                  tTitle="Wrapped Token"
                  symbolName={`${item.assetName}.dx`}
                  info={{
                    totalSupply: formatCurrency(item.wrappedTotalSupply),
                    address: item.wrappedContractAddress,
                  }}
                  href={`${networkConf[DxChainId].blockExplorerUrls}/token/${item.wrappedContractAddress}`}
                />
                {/* <InfoTag
                  tTitle="Wrapped Token"
                  symbolName={`${item.symbol}.e`}
                  info={item.swapSupply}
                /> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
