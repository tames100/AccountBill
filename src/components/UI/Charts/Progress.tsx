import React from 'react';
import * as Progress from 'react-native-progress'

interface ProgressProps {
}

const progressValue = 0.8; // 进度值 (0-1)
const activeColor = "#ffa726";

export function ProgressBarUI(props: ProgressProps) {


  return (
    <Progress.Bar
      progress={ progressValue }
      width={ 200 }
      height={ 12 }
      color={ activeColor }
      borderWidth={ 0 }
      borderRadius={ 6 }
      unfilledColor="rgba(255,255,255,0.2)"
      animated={ true }
    />
  );
}

export function ProgressCircleUI(props: ProgressProps) {
  const {} = props;
  const title = "123";

  return (
    <Progress.Circle
      progress={ progressValue }
      size={ 80 }
      thickness={ 6 }
      color={ activeColor }
      showsText={ true }
      formatText={ (progress) => `${ Math.round(progress * 100) }%` }
      strokeCap="round"
    />
  );
}

export function ProgressPeiUI(props: ProgressProps) {

  return (
    <Progress.Pie
      progress={ progressValue }
      size={ 90 }
      color={ activeColor }
    />
  );
}