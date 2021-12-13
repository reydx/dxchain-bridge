import Web3 from 'web3';
import { notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { sleep } from '@/utils/common';
import { networkConf } from '@/constants/netWork';

export const GAS_LIMIT = {
  GENERAL: 510000,
  SNX: 850000,
};

export const { ethereum }: any = window;

export const getWeb3 = () => new Web3(ethereum);

export const getHttpWeb3 = (chainId: number) => {
  return new Web3(
    new Web3.providers.HttpProvider(networkConf[chainId].rpcUrls[0]),
  );
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
    const r = await getWeb3().eth.getTransactionReceipt(txHash);
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
