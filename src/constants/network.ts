import { ETHCHAINID, DXCHAINID } from './chainId';
import Web3 from 'web3';

const numberToHex = (chainId: number) => Web3.utils.numberToHex(chainId);

const SCAN_ADDRESS = {
  [ETHCHAINID.TESTNET]: 'https://ropsten.etherscan.io',
  // [DXCHAINID.TESTNET]: 'https://testnet.bscscan.com',
  [DXCHAINID.TESTNET]: 'https://testnet.hecoinfo.com/',
  [ETHCHAINID.MAINNET]: 'https://etherscan.io',
  [DXCHAINID.MAINNET]: 'https://hecoinfo.com',
};

export const networkConf = {
  // ETH - TEST
  [ETHCHAINID.TESTNET]: {
    chainId: numberToHex(ETHCHAINID.TESTNET),
    chainName: 'Ropsten',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrls: SCAN_ADDRESS[ETHCHAINID.TESTNET],
  },
  // DX - TEST
  [DXCHAINID.TESTNET]: {
    chainId: numberToHex(DXCHAINID.TESTNET),
    chainName: 'Dxchain',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: 'https://http-testnet.hecochain.com',
    blockExplorerUrls: SCAN_ADDRESS[DXCHAINID.TESTNET],
  },
  // [DXCHAINID.TESTNET]: {
  //   chainId: numberToHex(DXCHAINID.TESTNET),
  //   chainName: 'Dxchain',
  //   nativeCurrency: {
  //     name: 'BNB',
  //     symbol: 'BNB',
  //     decimals: 18,
  //   },
  //   rpcUrls: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  //   blockExplorerUrls: SCAN_ADDRESS[DXCHAINID.TESTNET],
  // },
  // ETH - MAIN
  [ETHCHAINID.MAINNET]: {
    chainId: numberToHex(ETHCHAINID.MAINNET),
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrls: SCAN_ADDRESS[ETHCHAINID.MAINNET],
  },
  // DX - MAIN
  [DXCHAINID.MAINNET]: {
    chainId: numberToHex(DXCHAINID.MAINNET),
    chainName: 'Dxchain',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: 'https://http-mainnet.hecochain.com',
    blockExplorerUrls: SCAN_ADDRESS[DXCHAINID.MAINNET],
  },
};

export const changeNetwork = (chainId: number) => {
  return new Promise<void>((reslove) => {
    const { ethereum }: any = window;
    if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
      try {
        ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: numberToHex(chainId) }],
          })
          .then(() => {
            reslove();
          });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          try {
            ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    ...networkConf[chainId],
                  },
                ],
              })
              .then(() => {
                reslove();
              });
          } catch (addError) {
            console.log(`addError`, addError);
          }
        }
        console.log(`switchError`, switchError);
      }
    }
  });
};
