import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './index.less'

type Props = {
  errMsg: string| undefined;
};

export default function ErrorComponent(props: Props) {
  const { errMsg } = props;
  return errMsg ? (
    <div className="error-component">
      <ExclamationCircleOutlined className="icon" /> {errMsg}
    </div>
  ) : null;
}
