import { getBalance } from '@/api/DX';
import { SerializedToken } from '@/constants/tokens';
import { formatCurrency } from '@/utils/currency';
import { getHttpWeb3 } from '@/utils/web3';
import { useWeb3React } from '@web3-react/core';
import { otherChainId } from '@/constants/chainId';

export default function useCommonHooks() {
  const { chainId, library, account } = useWeb3React();

  const getTokenBalance = async (token: SerializedToken) => {
    let balance = '0';
    switch (token.symbol) {
      case 'ETH':
        balance = await library?.eth.getBalance(account);
        break;
      default:
        balance = await getBalance(account, token.address);
        break;
    }
    return formatCurrency(balance, 6);
  };

  const getOtherChainTokenBalance = async (
    token: SerializedToken,
    cid?: number,
  ) => {
    const id = cid || otherChainId(chainId);
    let balance = '0';

    switch (token.symbol) {
      case 'ETH':
        if (account) balance = await getHttpWeb3(id)?.eth.getBalance(account);
        break;
      default:
        balance = await getBalance(account, token.address, chainId);
        break;
    }
    return formatCurrency(balance, 6);
  };

  return {
    getTokenBalance,
    getOtherChainTokenBalance,
  };
}
