import { ETHCHAINID, DXCHAINID } from './chainId';
import Web3 from 'web3';

const numberToHex = (chainId: number) => Web3.utils.numberToHex(chainId);

const SCAN_ADDRESS = {
  [ETHCHAINID.TESTNET]: 'https://ropsten.etherscan.io',
  [DXCHAINID.TESTNET]: 'https://scan-testnet.hecochain.com',
};

export const networkConf = {
  [ETHCHAINID.TESTNET]: {
    chainId: numberToHex(ETHCHAINID.TESTNET),
    chainName: 'Ropsten',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrls: [SCAN_ADDRESS[ETHCHAINID.TESTNET]],
  },
  [DXCHAINID.TESTNET]: {
    chainId: numberToHex(DXCHAINID.TESTNET),
    chainName: 'Hecochain-testnet',
    nativeCurrency: {
      name: 'HT',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: 'https://http-testnet.hecochain.com',
    blockExplorerUrls: [SCAN_ADDRESS[DXCHAINID.TESTNET]],
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
