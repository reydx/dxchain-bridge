import wethAbi from '@/constants/abi/WETH.json';
import Web3 from 'web3';
import { getContract } from './contract';

type wethDepositType = {
  amount: string;
  account: string | null | undefined;
  wethNativeContractAddress: string;
  callback: (txHash: string) => void;
  errCallback: () => void;
};

export const wethDeposit = async (props: wethDepositType) => {
  const { amount, account, wethNativeContractAddress, callback, errCallback } =
    props;
  const contract = getContract(wethAbi, wethNativeContractAddress);

  return await contract.methods.deposit().send(
    {
      from: account,
      value: Web3.utils.toWei(amount),
    },
    async (err: any, txHash: any) => {
      if (err) {
        errCallback();
      } else {
        callback(txHash);
        return txHash;
      }
    },
  );
};
