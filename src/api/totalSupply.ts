import { getChainContract } from './contract';
import dxAbi from '@/constants/abi/DXERC20.json';
import ethAbi from '@/constants/abi/WETH.json';
import { SerializedToken } from '@/models/useGetState';
import { getBalanceAmount } from '@/utils/formatBalance';
import BigNumber from 'bignumber.js';

type getTotalSupplyType = {
  token: SerializedToken;
};

export const getTotalSupply = async (props: getTotalSupplyType) => {
  const { token } = props;
  console.log(`token`, token);
  const ethContract = getChainContract(
    ethAbi,
    token.nativeContractAddress,
    true,
  );
  const dxContract = getChainContract(
    dxAbi,
    token.wrappedContractAddress,
    false,
  );
  const [r1, r2] = await Promise.all([
    ethContract.methods.totalSupply().call(),
    dxContract.methods.totalSupply().call(),
  ]);

  return {
    nativeTotalSupply: getBalanceAmount(new BigNumber(r1), token.denomination),
    wrappedTotalSupply: getBalanceAmount(new BigNumber(r2), token.denomination),
  };
};