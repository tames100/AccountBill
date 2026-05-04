import { useRef, useEffect } from 'react';
import { Animated, PanResponder, PanResponderGestureState } from 'react-native';

type Direction = 'x' | 'y' | 'both';
type Mode = 'drag' | 'click';

export function useGesture(
  direction: Direction = 'both',
  mode: Mode = 'drag',
  config = {
    maxX: 150,
    maxY: 150,
    bounciness: 8,
    speed: 12,
  }
) {
  // 水平
  const translateX = useRef(new Animated.Value(0)).current;
  // 垂直
  const translateY = useRef(new Animated.Value(0)).current;
  // 当前xy坐标
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const x = translateX.addListener(v => currentX.current = v.value);
    const y = translateY.addListener(v => currentY.current = v.value);
    return () => {
      translateX.removeListener(x);
      translateY.removeListener(y);
    };
  }, []);

  const shouldRecognize = (gesture: PanResponderGestureState) => {
    if (mode === 'click') return false;
    const { dx, dy } = gesture;
    if (direction === 'x') return Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy);
    if (direction === 'y') return Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx);
    return true;
  };

  const panResponder = PanResponder.create({
    // 点击时接管动作
    onStartShouldSetPanResponder: () => mode === 'click',
    // 移动式接管动作
    onMoveShouldSetPanResponder: (_, g) => shouldRecognize(g),

    // 移动的动作设定
    onPanResponderMove: (_, g) => {
      if (mode === 'click') return;

      if (direction === 'x' || direction === 'both') {
        // let newX = currentX.current + g.dx;
        const newX = Math.max(-config.maxX, Math.min(config.maxX, g.dx));
        translateX.setValue(newX);
      }

      if (direction === 'y' || direction === 'both') {
        // let newY = currentY.current + g.dy;
        const newY = Math.max(-config.maxY, Math.min(config.maxY, g.dy));
        translateY.setValue(newY);
      }
    },

    // 阻尼感
    onPanResponderRelease: () => {
      // 如果是点击模式，直接退出
      // if (mode === 'click') return;
      // 水平方向
      // Animated.spring(translateX, {
      //   toValue: 0,
      //   bounciness: config.bounciness,
      //   speed: config.speed,
      //   useNativeDriver: true,
      // }).start();
      // 垂直方向的
      // Animated.spring(translateY, {
      //   toValue: 0,
      //   bounciness: config.bounciness,
      //   speed: config.speed,
      //   useNativeDriver: true,
      // }).start();
    },
  });

  return {
    panHandlers: panResponder.panHandlers,
    translateX,
    translateY,
  };
}