import { getContract } from './contract';
import ethAbi from '@/constants/abi/WETH.json';
import dxErc20Abi from '@/constants/abi/DXERC20.json';
import { amountToBigNumber } from '@/utils/currency';
import { isETHChain, otherChainId } from '@/constants/chainId';
import { SerializedToken } from '@/models/useGetState';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

type transactionApiType = {
  account: string | null | undefined;
  chainId: number;
  amount: string;
  jsonConfig: any;
  token: SerializedToken;
  callback: () => void;
  successCallback: (txHash: string) => void;
  errorCallback: () => void;
};

export const transferApi = async (props: transactionApiType) => {
  const {
    account,
    chainId,
    amount,
    jsonConfig,
    token,
    callback,
    errorCallback,
    successCallback,
  } = props;
  const {
    critical: {
      walletAddress: { ethereum, dxchain },
    },
  } = jsonConfig;
  callback();
  const isEth = isETHChain(chainId);
  const { nativeContractAddress, wrappedContractAddress } = token;
  const tokenAddress = isEth ? nativeContractAddress : wrappedContractAddress;
  const walletAddress = isEth ? ethereum : dxchain;
  const abi = isEth ? ethAbi : dxErc20Abi;
  const contract = getContract(abi, tokenAddress);

  if (isEth) {
    const params = {
      from: account,
      gas: 510000,
    };
    return await contract.methods
      .transfer(walletAddress, amountToBigNumber(amount))
      .send(params, async (err: any, txHash: any) => {
        if (err) {
          errorCallback();
        } else {
          successCallback(txHash);
          return txHash;
        }
      });
  } else {
    const params = {
      from: account,
      gas: 510000,
    };
    return await contract.methods
      .unwrap(amountToBigNumber(amount), otherChainId(chainId))
      .send(params, async (err: any, txHash: any) => {
        if (err) {
          errorCallback();
        } else {
          successCallback(txHash);
          return txHash;
        }
      });
  }
};
