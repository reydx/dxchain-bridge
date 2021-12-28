import { SetStateAction, useState } from 'react';
import { useModel } from 'umi';
import { SerializedToken } from './useGetState';
import bridgeSeeting from '@/constants/abi/bridge_settings_1.json';

export default function useSelectModel() {
  const [searchToken, setSearchToken] = useState<SerializedToken>(
    bridgeSeeting.critical.assets.WETH,
  );

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
