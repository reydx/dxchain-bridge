import { useState, useCallback, useEffect } from 'react';

export default function useSelectModel() {
  const [selectTokenAddress, setSelectTokenAddress] = useState('');

  return {
    selectTokenAddress,
    setSelectTokenAddress,
  };
}
