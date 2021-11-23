import React from 'react';
import Logo from '@/assets/common/logo.png';
import './index.less';
import Menu from '@/components/Menu';
import Account from '../Account';

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="" />
      <div className="right">
        <Menu />
        <Account />
      </div>
    </div>
  );
}
