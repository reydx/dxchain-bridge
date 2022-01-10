import Note from '@/components/Note';
import Progress from '@/components/Progress';
import { networkConf } from '@/constants/network';
import { useWeb3React } from '@web3-react/core';
import wrappingHooks from './hooks';
import './index.less';

export default function Wrapping() {
  const { percent, txHash } = wrappingHooks();
  const { chainId } = useWeb3React();

  return (
    <div className="wrapping-page">
      <Note
        msg={'Transferring ETH over the bridge requires two transactions'}
      />

      <div className="box">
        <div className="title">Wrapping your ETH</div>
        <div>
          Waiting for{' '}
          <a
            target="_blank"
            href={`${
              networkConf[Number(chainId)]?.blockExplorerUrls
            }/tx/${txHash}`}
          >
            Confirmation
          </a>
        </div>
        <Progress percent={percent} />
      </div>
    </div>
  );
}
