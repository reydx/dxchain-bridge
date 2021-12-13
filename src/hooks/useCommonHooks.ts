import { getBalance } from '@/api/DX';
import { SerializedToken } from '@/constants/tokens';
import { formatCurrency } from '@/utils/currency';
import { useWeb3React } from '@web3-react/core';

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

  return {
    getTokenBalance,
  };
}
