import React from 'react';
import Logo from '@/assets/common/logo.png';
import './index.less';
import Menu from '@/components/Menu';
import Account from '../Account';
import useCommonHooks from '@/hooks/useCommonHooks';

export default function Header() {
  const { routerPush } = useCommonHooks();
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="" onClick={() => routerPush('/')} />
      <div className="right">
        <Menu />
        <Account />
      </div>
    </div>
  );
}
