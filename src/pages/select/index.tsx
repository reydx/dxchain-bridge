import React from 'react';
import { Input } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import './index.less';
import { TokenImage } from '@/components/TokenImage';
import search from '@/assets/select/search.png'
import { useHistory } from 'umi';

export default function Select() {
  const history = useHistory()
  const list = [
    {
      name: 'USDT',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 99999,
    },
    {
      name: 'AAVE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },    {
      name: '1asd',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },    {
      name: 'AA3VE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },    {
      name: 'AA4VE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },  {
      name: 'AA4VE',
      symbol: '0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5',
      balance: 8888,
    },
  ];

  return (
    <div className="select-box">
        <div>
          Transfer to Avalanche network <CloseOutlined className="icon" onClick={() => history.push('/')}/>
        </div>
        <div>Choose a token from Ethereum</div>

        <Input className="search" placeholder="Search here" prefix={<img src={search} />} />

        <ul>
          {list.map((item) => {
            return (
              <li key={item.name}>
                <TokenImage />
                <div className="right">
                  {item.balance} {item.name}
                </div>
              </li>
            );
          })}
        </ul>
    </div>
  );
}
