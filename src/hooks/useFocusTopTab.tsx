import {useFocusEffect} from '@react-navigation/native';
import {useState} from 'react';

const useFocusTopTab = (cb: (num: number) => void) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useFocusEffect(() => {
    cb(layoutHeight);
  });

  return {
    setLayoutHeight,
  };
};

export default useFocusTopTab;
