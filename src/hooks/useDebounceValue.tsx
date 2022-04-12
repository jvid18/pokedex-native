import {useEffect, useState} from 'react';

interface UseDebounceValue {
  input?: string;
  time?: number;
}

const useDebounceValue = ({input = '', time = 500}: UseDebounceValue = {}) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(input);
    }, time);

    return () => clearTimeout(timeOut);
  }, [input]);

  return debounceValue;
};

export default useDebounceValue;
