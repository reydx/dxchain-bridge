
import React from 'react'
import Note from '@/components/Note'
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png'
import './index.less'

export default function Confirm() {
  return (
    <div className="confirm-page">
        <Note msg={"Transferring ETH over the bridge requires two transactions"} />

        <div className="box">
            <div className="title">Transaction Pending</div>
            <img src={meatMaskLogoW} alt="" />
            <div>Your native asset needs to be wrapped to transfer it through the bridge</div>
            <div>Please confirm it in MetaMask</div>
        </div>
    </div>
  )
}
