import React from 'react'
import Logo from '@/assets/common/logo.png'
import './index.less'
import Menu from '@/components/Menu'

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="" />
      <Menu />
    </div>
  )
}
