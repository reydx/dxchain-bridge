import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useAuth from '@/hooks/useAuth';
import './index.less';

type Props = {
  errMsg?: string | undefined;
};

export default function ErrorComponent(props: Props) {
  const auth = useAuth();
  const { errMsg } = props;
  return errMsg ? (
    <div className="error-component">
      <ExclamationCircleOutlined className="icon" />{' '}
      {errMsg || auth.error?.message}
    </div>
  ) : null;
}
