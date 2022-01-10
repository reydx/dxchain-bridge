import useTransfer from '@/hooks/useTransfer';
import { awaitTransaction } from '@/utils/web3';
import { useEffect, useState } from 'react';
import { history } from 'umi';

export default function wrappingHooks() {
  const [percent, setpercent] = useState(1);
  const [txHash, setTxHash] = useState('');
  const { transferApiFn } = useTransfer();

  const err = () => history.push('/');

  useEffect(() => {
    if (history.action !== 'PUSH') {
      err();
      return;
    }
    try {
      const { txHash }: any = history.location.query;
      setTxHash(txHash);
      awaitTransaction(txHash).then((res) => {
        if (res) {
          setpercent(100);
          transferApiFn();
        }
      });
    } catch (error) {
      err();
    }
  }, []);

  return {
    percent,
    txHash,
  };
}
