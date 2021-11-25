import React from 'react'
import { CloseOutlined } from '@ant-design/icons';
import './index.less'

type Props = {
  msg: string | undefined
}

export default function Note(props: Props) {
  const { msg } = props
  return (
    <div className="note-component">
      <div>Note: {msg}</div>
      <CloseOutlined className="icon"/>
    </div>
  )
}
