import Web3 from 'web3';
import { notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { sleep } from '@/utils/common';

export const GAS_LIMIT = {
  GENERAL: 510000,
  SNX: 850000,
};

export const provider = window?.ethereum;

const web3 = new Web3(provider);

export const getWeb3 = () => {
  return web3;
};

export const awaitTransaction = async (
  txHash: string,
  notify: boolean = true,
) => {
  let txReceipt = null;

  notify &&
    notification.open({
      message: 'Processing',
      icon: <LoadingOutlined style={{ fontSize: 24 }} spin />,
      duration: null,
    });

  while (txReceipt === null) {
    const r = await web3.eth.getTransactionReceipt(txHash);
    txReceipt = r;
    if (r) {
      notification.destroy();
      notify &&
        notification.success({
          message: 'Done',
        });
    }
    await sleep(2000);
  }
  return txReceipt;
};

export default web3;
