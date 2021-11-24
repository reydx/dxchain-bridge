import React from 'react'
import { CloseOutlined } from '@ant-design/icons'
import './index.less'

export default function Select() {
  const list = [
    {
      symbol: 'USDT',
      address: 'xxxxx',
      balance: 99999
    },
    {
      symbol: 'USDT',
      address: 'xxxxx',
      balance: 8888
    },
  ]

  return (
    <div className="select">
      <div>Transfer to Avalanche network <CloseOutlined /></div>
    </div>
  )
}
