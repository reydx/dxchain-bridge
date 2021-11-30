import React from 'react';
import { Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { TokenImage } from '@/components/TokenImage';
import search from '@/assets/select/search.png';
import { useHistory, useModel } from 'umi';
import './index.less';

export default function Select() {
  const history = useHistory();
  const { list, get } = useModel('useSelectModel', (model) => ({
    list: model.tokenList,
    get: model.get,
  }));

  return (
    <div className="select-box">
      <div>
        Transfer to Avalanche network{' '}
        <CloseOutlined className="icon" onClick={() => history.push('/')} />
      </div>
      <div onClick={() => get()}>Choose a token from Ethereum</div>

      <Input
        className="search"
        placeholder="Search here"
        prefix={<img src={search} />}
      />

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
