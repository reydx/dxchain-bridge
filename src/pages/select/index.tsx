import React, { useEffect } from 'react';
import { Input } from 'antd';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { TokenImage } from '@/components/TokenImage';
import search from '@/assets/select/search.png';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'umi';
import selectHooks from './hooks';
import './index.less';

export default function Select() {
  const history = useHistory();
  const { chainId } = useWeb3React();
  const { searchTokenList, searchChange, getAllTokens, clickToken } =
    selectHooks();

  useEffect(() => {
    if (chainId) {
      getAllTokens(true);
    }
  }, [chainId]);

  return (
    <div className="select-box">
      <div>
        Transfer to Avalanche network
        <CloseOutlined className="icon" onClick={() => history.push('/')} />
      </div>
      <div>Choose a token from Ethereum</div>

      <Input
        className="search"
        placeholder="Search here"
        prefix={<img src={search} />}
        onChange={searchChange}
      />

      <ul>
        {searchTokenList.map((item) => {
          return (
            <li key={item.symbol} onClick={() => clickToken(item.symbol)}>
              <TokenImage token={item} />
              {item.balance ? (
                <div className="right">
                  {item.balance}
                  {/* {item.symbol}.e */}
                </div>
              ) : (
                <LoadingOutlined className="loading-icon" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
