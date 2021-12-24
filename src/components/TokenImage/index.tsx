import { SerializedToken } from '@/models/useGetState';
import './index.less';

type Props = {
  token: any;
};
// SerializedToken
export function TokenImage(props: Props) {
  const { token } = props;
  return (
    <div className="token-image">
      <img src={`./tokens/${token?.assetName}.png`} alt="" />
      {token?.assetName}
    </div>
  );
}
