import { getTotalSupply } from '@/api/totalSupply';
import { SerializedToken } from '@/models/useGetState';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

export default function proofHooks() {
  const { tokens } = useModel('useGetState', (data) => data);
  const [proofList, setProofList] = useState<SerializedToken[]>([]);

  const init = async () => {
    const list = [...tokens];
    setProofList([...list]);
    for (const key in list) {
      await getTotalSupply({ token: list[key] }).then((res) => {
        list[key] = {
          ...list[key],
          ...res,
        };
      });
    }
    setProofList([...list]);
  };

  useEffect(() => {
    init();
  }, []);

  return {
    proofList,
  };
}
