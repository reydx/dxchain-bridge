import { InjectedConnector } from '@web3-react/injected-connector';
import { ChainId } from '@/constants/chainId';

export const injected = new InjectedConnector({
  supportedChainIds: ChainId,
});
