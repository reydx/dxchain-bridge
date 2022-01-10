import Note from '@/components/Note';
import meatMaskLogoW from '@/assets/common/meatMask-logo-w.png';
import confirmHooks from './hooks';
import './index.less';

export default function Confirm() {
  const {} = confirmHooks();
  return (
    <div className="confirm-page">
      <Note
        msg={'Transferring ETH over the bridge requires two transactions'}
      />

      <div className="box">
        <div className="title">Wrapping your ETH</div>
        <img src={meatMaskLogoW} alt="" />
        <div>
          Your native asset needs to be wrapped to transfer it through the
          bridge
        </div>
        <div>Please confirm it in MetaMask</div>
      </div>
    </div>
  );
}
