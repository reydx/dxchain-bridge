import { getBalance } from '@/api/DX';
import { getTotalSupply } from '@/api/totalSupply';
import { EthChainId } from '@/constants/chainId';
import { SerializedToken } from '@/models/useGetState';
import { getBalanceAmount } from '@/utils/formatBalance';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

export default function proofHooks() {
  const { tokens, Data } = useModel('useGetState', (data) => data);
  const [proofList, setProofList] = useState<SerializedToken[]>([]);

  const balanceOfAndTotalSupply = async (token: SerializedToken) => {
    const [r1, r2] = await Promise.all([
      getBalance(
        Data.critical.walletAddress.ethereum,
        token.nativeContractAddress,
        EthChainId,
      ),
      getTotalSupply({ token }),
    ]);
    return {
      wrappedTotalSupply: r2,
      nativeBalanceOf: getBalanceAmount(new BigNumber(r1), token.denomination),
    };
  };

  const init = async () => {
    const list = [...tokens].filter((item) => item.assetName !== 'ETH');
    setProofList([...list]);
    for (const key in list) {
      await balanceOfAndTotalSupply(list[key]).then((res) => {
        list[key] = {
          ...list[key],
          ...res,
        };
      });
    }
    setProofList([...list]);
  };

  useEffect(() => {
    init();
  }, []);

  return {
    proofList,
  };
}
