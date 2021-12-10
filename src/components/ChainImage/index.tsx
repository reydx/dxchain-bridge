import { ChainName } from '@/constants/chainId';
import './index.less';

type Props = {
  chainId: number;
};

export default function ChianImage(props: Props) {
  const { chainId } = props;
  return (
    <div className="token-image">
      <img src={`/chains/${ChainName[chainId]}.png`} alt="" />
      {ChainName[chainId]}
    </div>
  );
}
