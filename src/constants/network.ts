import { ETHCHAINID, HTCHAINID } from './chainId';
import Web3 from 'web3';

const numberToHex = (chainId: number) => Web3.utils.numberToHex(chainId);

const SCAN_ADDRESS = {
  [ETHCHAINID.TESTNET]: 'https://ropsten.etherscan.io',
  [HTCHAINID.TESTNET]: 'https://scan-testnet.hecochain.com',
};

const networkConf = {
  [ETHCHAINID.TESTNET]: {
    chainId: numberToHex(3),
    chainName: 'Ropsten 测试网络',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrls: [SCAN_ADDRESS[ETHCHAINID.TESTNET]],
  },
  [HTCHAINID.TESTNET]: {
    chainId: numberToHex(256),
    chainName: 'hecochain-testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://http-testnet.hecochain.com'],
    blockExplorerUrls: [SCAN_ADDRESS[HTCHAINID.TESTNET]],
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
