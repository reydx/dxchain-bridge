import React from 'react';
import { MenuOutlined } from '@ant-design/icons'
import './index.less'

export default function Menu() {
  const menuList = [
    {
      name: 'Community',
      link: '',
    },
    {
      name: 'Browser',
      link: '',
    },
    {
      name: 'Official website',
      link: '',
    },
  ];

  return (
    <div className="menu">
      <div className="pc-menu">
        {menuList.map((item) => {
          return <div key={item.name}>{item.name}</div>;
        })}
      </div>
      <div className="m-menu">
        <MenuOutlined className="menu-icon"/>
      </div>
    </div>
  );
}
