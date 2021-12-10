import { ETHCHAINID, HTCHAINID } from './chainId';

interface SerializedTokenList {
  [symbol: string]: SerializedToken;
}

export interface SerializedToken {
  chainId?: number;
  addressConfig: {
    [chainId: number]: string;
  };
  address?: string;
  balance?: string;
  decimals: number;
  symbol: string;
  name?: string;
  projectLink?: string;
  logoURI: string;
}

export const TokensConfig: SerializedTokenList = {
  ETH: {
    addressConfig: {
      [ETHCHAINID.MAINNET]: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      [ETHCHAINID.TESTNET]: '0xDe4044Df84670490B704cf7FA81018D78216c713',
      [HTCHAINID.MAINNET]: '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
      [HTCHAINID.TESTNET]: '0xDe4044Df84670490B704cf7FA81018D78216c713',
    },
    decimals: 18,
    symbol: 'ETH',
    logoURI: '/tokens/ETH.png',
  },
  // DX: {
  //   addressConfig: {
  //     [ETHCHAINID.MAINNET]: '0xcA7bBEC6839965aC8dfe077b52EBB6519fFFe156',
  //     [ETHCHAINID.TESTNET]: '0xF52e0412EfdB49a7782CeD1EE7b4f8F3395A8495',
  //     [HTCHAINID.MAINNET]: '0x66a79d23e58475d2738179ca52cd0b41d73f0bea',
  //     [HTCHAINID.TESTNET]: '0xF52e0412EfdB49a7782CeD1EE7b4f8F3395A8b93',
  //   },
  //   decimals: 18,
  //   symbol: 'DX',
  //   logoURI: '/tokens/DX.png',
  // },
  DAI: {
    addressConfig: {
      [ETHCHAINID.MAINNET]: '0xcA7bBEC6839965aC8dfe077b52EBB6519fFFe155',
      [ETHCHAINID.TESTNET]: '0xF52e0412EfdB49a7782CeD1EE7b4f8F3395A8b95',
      [HTCHAINID.MAINNET]: '0x66a79d23e58475d2738179ca52cd0b41d73f0bea',
      [HTCHAINID.TESTNET]: '0x60d64Ef311a4F0E288120543A14e7f90E76304c6',
    },
    decimals: 18,
    symbol: 'DAI',
    logoURI: '/tokens/none.png',
  },
};

export const tokens = (chainId: number | undefined) => {
  let defaultTokens: SerializedToken[] = [];
  if (chainId) {
    defaultTokens = Object.keys(TokensConfig).reduce(
      (pre: SerializedToken[], current) => {
        const symbol = { ...TokensConfig[current] };
        symbol.chainId = symbol.chainId;
        symbol.address = symbol.addressConfig[chainId];
        return [...pre, symbol];
      },
      [],
    );
  }
  return defaultTokens;
};
