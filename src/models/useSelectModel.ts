import { SetStateAction, useState } from 'react';
import { useModel } from 'umi';
import { SerializedToken } from './useGetState';

export default function useSelectModel() {
  const [searchToken, setSearchToken] = useState<SerializedToken>({
    asset: '',
    assetName: '',
    chainlinkFeedAddress: '',
    denomination: 18,
    nativeContractAddress: '',
    nativeNetwork: 'ethereum',
    nativeBalance: '0',
    offboardFeeDollars: 15,
    onboardFeeDollars: 3,
    tokenName: '',
    wrappedContractAddress: '',
    wrappedNetwork: 'dxchain',
    wrappedBalance: '0',
  });

  const clickToken = (history: any, token: SerializedToken) => {
    setSearchToken(token);
    history.push('/');
  };

  return {
    searchToken,
    clickToken,
    setSearchToken,
  };
}
