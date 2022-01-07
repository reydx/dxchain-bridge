import { getChainContract, getContract } from './contract';
import ethAbi from '@/constants/abi/WETH.json';
import dxErc20Abi from '@/constants/abi/DXERC20.json';
import { amountToBigNumber } from '@/utils/currency';
import { isETHChain, otherChainId } from '@/constants/chainId';
import { SerializedToken } from '@/models/useGetState';
import { getEthChainHttpWeb3 } from '@/utils/web3';
import { getBalanceAmount, getDecimalAmount } from '@/utils/formatBalance';
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
    console.log(`amount`, amount);
    console.log(`amountToBigNumber(amount)`, amountToBigNumber(amount));
    console.log(
      `amountToBigNumber(amount)`,
      amountToBigNumber(amount).toNumber(),
    );
    return await contract.methods
      .transfer(
        walletAddress,
        getDecimalAmount(new BigNumber(amount), token.denomination),
      )
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

type ethGasFeeType = {
  token: SerializedToken;
  input: string;
  jsonConfig: any;
  account: string | undefined | null;
};

export const ethGasFee = async (props: ethGasFeeType) => {
  const { token, input, jsonConfig, account } = props;

  let gasFee = new BigNumber(0);

  if (input !== '' && Number(input) > 0 && account) {
    const ethGetPrice = getEthChainHttpWeb3().eth.getGasPrice;

    const ethContract = getChainContract(
      ethAbi,
      token.nativeContractAddress,
      true,
    );

    const estimateGas = ethContract.methods.transfer(
      account,
      amountToBigNumber(input),
    ).estimateGas;

    const [gasPrice, gasUsed] = await Promise.all([
      ethGetPrice(),
      estimateGas({
        from: jsonConfig.critical.walletAddress.ethereum,
      }),
    ]);

    gasFee = new BigNumber(gasPrice).times(gasUsed);
  }

  return new BigNumber(getBalanceAmount(gasFee, token.denomination));
};
