import React, { useEffect } from 'react';
import { Input } from 'antd';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { TokenImage } from '@/components/TokenImage';
import useBalance from '@/hooks/useBalance';
import search from '@/assets/select/search.png';
import { useWeb3React } from '@web3-react/core';
import { useHistory, useModel } from 'umi';
import selectHooks from './hooks';
import './index.less';
import { formatCurrency } from '@/utils/currency';

export default function Select() {
  const history = useHistory();
  const { chainId } = useWeb3React();
  const { searchTokenList, searchChange, getAllBalance } = selectHooks();
  const { showBalanceKey } = useBalance();
  const { clickToken } = useModel('useSelectModel', (data) => data);

  useEffect(() => {
    getAllBalance();
  }, [chainId]);

  return (
    <div className="select-box">
      <div>
        Transfer to DxChain network
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
            <li key={item.asset} onClick={() => clickToken(history, item)}>
              <TokenImage token={item} />
              {item[showBalanceKey] !== undefined ? (
                <div className="right">
                  {formatCurrency(item[showBalanceKey], 6)}
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
