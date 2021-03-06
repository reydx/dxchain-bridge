import { SerializedToken } from '@/models/useGetState';
import './index.less';

type Props = {
  token: SerializedToken;
};

export function TokenImage(props: Props) {
  const { token } = props;
  return (
    <div className="token-image">
      <img src={`/tokens/${token?.assetName || 'none'}.png`} alt="" />
      {token?.assetName}
    </div>
  );
}
