import { SerializedToken } from '@/constants/tokens';
import './index.less';

type Props = {
  token: SerializedToken;
};

export function TokenImage(props: Props) {
  const {
    token = {
      logoURI: '',
      symbol: '',
    },
  } = props;
  return (
    <div className="token-image">
      <img
        src={
          token.logoURI ||
          `https://pancakeswap.finance/images/tokens/${token.address}.png`
        }
        alt=""
      />
      {token.symbol}
    </div>
  );
}
