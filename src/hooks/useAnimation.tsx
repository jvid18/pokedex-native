import {useRef} from 'react';
import {Animated} from 'react-native';

export interface AnimationProps {
  initialPosition?: number;
  initialOpacity?: number;
}

export interface TransitionProps {
  toValue: number;
  duration?: number;
  easing?: (x: number) => number;
}

export interface FadeProps {
  duration?: number;
  toValue?: number;
}

const useAnimation = ({
  initialPosition = 0,
  initialOpacity = 0,
}: AnimationProps = {}) => {
  const opacity = useRef(new Animated.Value(initialOpacity)).current;
  const position = useRef(new Animated.Value(initialPosition)).current;

  const fadeIn = ({duration = 500, toValue = 1}: FadeProps = {}) => {
    Animated.timing(opacity, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = ({duration = 500, toValue = 0}: FadeProps = {}) => {
    Animated.timing(opacity, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const startTransition = ({
    toValue,
    duration = 300,
    easing,
  }: TransitionProps) => {
    Animated.timing(position, {
      toValue,
      duration,
      easing,
      useNativeDriver: true,
    }).start();
  };

  return {
    opacity,
    position,
    fadeIn,
    fadeOut,
    startTransition,
  };
};

export default useAnimation;
