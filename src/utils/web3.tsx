import Web3 from 'web3';
import { notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { sleep } from '@/utils/common';
import { networkConf } from '@/constants/network';
import { ETHCHAINID, DXCHAINID } from '@/constants/chainId';

export const GAS_LIMIT = {
  GENERAL: 510000,
  SNX: 850000,
};

export const { ethereum }: any = window;

export const getWeb3 = () => new Web3(ethereum);

export const getHttpWeb3 = (chainId: number) => {
  return new Web3(
    new Web3.providers.HttpProvider(networkConf[chainId].rpcUrls),
  );
};

export const getEthChainHttpWeb3 = (reactNet = REACT_NET) => {
  return new Web3(
    new Web3.providers.HttpProvider(networkConf[ETHCHAINID[reactNet]].rpcUrls),
  );
};

export const getDxChainHttpWeb3 = (reactNet = REACT_NET) => {
  return new Web3(
    new Web3.providers.HttpProvider(networkConf[DXCHAINID[reactNet]].rpcUrls),
  );
};

export const awaitTransaction = async (
  txHash: string,
  notify: boolean = false,
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

export const awaitGetBlockTransactionCount = async (txHash: string) => {
  const r = await getWeb3().eth.getTransaction(txHash);
  return r;
};
