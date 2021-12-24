import { networkConf } from '@/constants/network';
import './index.less';

type Props = {
  chainId: number;
};

export default function ChianImage(props: Props) {
  const { chainId } = props;
  return (
    <div className="token-image">
      <img src={`/chains/${networkConf[chainId].chainName}.png`} alt="" />
      {networkConf[chainId].chainName}
    </div>
  );
}
