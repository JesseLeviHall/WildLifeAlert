import * as React from 'react';
import { View, Button ,Vibration, } from 'react-native';
import { Motion } from "@legendapp/motion"
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
      <Motion.Pressable>
    <Motion.View
        whileTap={{ y: 30 }}
        transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300
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
</Motion.Pressable>
      
      <Button
										textColor='#2a527a'
										mode='text'
										labelStyle={{ fontSize: 20 }}
										contentStyle={{}}
										uppercase={true}
									
										onPressIn={() => Vibration.vibrate(50)}>
										Start Alert
									</Button>
    </MotionView>
  );
};



export default About;
