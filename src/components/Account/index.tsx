import React, { useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import meatMaskLogo from '@/assets/common/meatMask-logo.png';
import AccountModal from './components/AccountModal';
import './index.less';

export default function Account() {
  const { account } = useWeb3React();
  const accountModalRef: any = useRef(null);
  console.log(`account`, account);
  const show = () => accountModalRef.current.open();

  return account ? (
    <>
      <div className="account" onClick={show}>
        <img src={meatMaskLogo} alt="" />
        <span>Account {account.slice(0, 4)}</span>
      </div>
        <AccountModal oRef={accountModalRef} />
    </>
  ) : null;
}
