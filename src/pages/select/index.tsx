import React from 'react';
import { Input } from 'antd';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { TokenImage } from '@/components/TokenImage';
import search from '@/assets/select/search.png';
import { useHistory } from 'umi';
import selectHooks from './hooks';
import './index.less';

export default function Select() {
  const history = useHistory();
  const { tokenList } = selectHooks();

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
      />

      <ul>
        {tokenList.map((item) => {
          return (
            <li key={item.symbol}>
              <TokenImage token={item} />
              {item.balance ? (
                <div className="right">
                  {item.balance} {item.symbol}
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
