import * as React from 'react';
import { View } from 'react-native';
import { MotionLinearGradient } from '@legendapp/motion/linear-gradient-expo';
import { styled } from 'nativewind';

const MotionView = styled(View);

type Props = {};

const About = (props: Props) => {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <MotionView className="filter flex-1 items-center justify-center">
      <MotionLinearGradient
        animateProps={{
          colors: [
            value ? '#e8e2ba' : 'blue',
            value ? '#F7AB0A' : 'yellow',
          ],
          start: { x: 0, y: 0 },
          end: { x: value ? 1 : 0, y: 1 },
        }}
        style={{
    height: 220,
    width: 220,
    borderRadius: 108,
    backgroundColor: '#F7AB0A',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: '#000',
  }}
      />
    </MotionView>
  );
};

export default About;
