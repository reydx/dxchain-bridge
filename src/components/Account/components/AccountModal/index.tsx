import React, { useState, useImperativeHandle, Ref } from 'react';
import { Modal } from 'antd';
import { CopyOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core';
import './index.less'
import { copy } from '@/utils/common';

type Props = {
  oRef: Ref<any> | undefined;
};

export default function AccountModal(props: Props) {
  const { oRef } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { account = '' } = useWeb3React();

  const open = () => setIsModalVisible(true);
  const close = () => setIsModalVisible(false);

  useImperativeHandle(
    oRef,
    () => ({
      open,
      close,
    }),
    [],
  );

  return (
    <Modal
      visible={isModalVisible}
      onCancel={close}
      closable={false}
      footer={null}
      className="account-modal"
      width={300}
      mask={false}
    >
      <div className="title">
        Account {account?.slice(0, 4)}
      </div>
      <div className="address" onClick={() => copy(`${account}`)}>
        {account}
        <CopyOutlined className="icon"/>
      </div>
    </Modal>
  );
}
