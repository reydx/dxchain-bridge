import { getContract } from './contract';
import abi from '@/constants/abi/WETH.json';
import { amountToBigNumber } from '@/utils/currency';
import { isETHChain } from '@/constants/chainId';
import { SerializedToken } from '@/models/useGetState';

type transactionApiType = {
  account: string | null | undefined;
  chainId: number | undefined;
  amount: string;
  jsonConfig: any;
  token: SerializedToken;
  callback: () => void;
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
  } = props;
  const {
    critical: {
      walletAddress: { ethereum, dxchain },
    },
  } = jsonConfig;
  callback();
  const { nativeContractAddress, wrappedContractAddress } = token;
  const tokenAddress = isETHChain(chainId)
    ? nativeContractAddress
    : wrappedContractAddress;
  const walletAddress = isETHChain(chainId) ? ethereum : dxchain;
  const contract = getContract(abi, tokenAddress);
  const params = {
    from: account,
  };
  return await contract.methods
    .transfer(walletAddress, amountToBigNumber(amount))
    .send(params, (err: any, txHash: any) => {
      if (err) {
        errorCallback();
      } else {
        console.log(`txHash`, txHash);
        return txHash;
      }
    });
};
