import { SetStateAction, useState } from 'react';
import { SerializedToken, TokensConfig } from '@/constants/tokens';

export default function useSelectModel() {
  const [searchToken, setSearchToken] = useState(TokensConfig.ETH);

  const clickToken = (history: any, token: SetStateAction<SerializedToken>) => {
    setSearchToken(token);
    history.push('/');
  };

  return {
    searchToken,
    clickToken,
  };
}
