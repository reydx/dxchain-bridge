import { ETHCHAINID } from '@/constants/chainId';
import { networkConf } from '@/constants/network';
import './index.less';

type Props = {
  chainId: number | undefined;
};

export default function ChianImage(props: Props) {
  const { chainId } = props;
  return (
    <div className="token-image">
      <img
        src={
          chainId
            ? `/chains/${networkConf[chainId].chainName}.png`
            : '/tokens/none.png'
        }
        alt=""
      />
      {chainId ? networkConf?.[chainId].chainName : '--'}
    </div>
  );
}
