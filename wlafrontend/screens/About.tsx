import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedGradient from "../components/background/GradientAnimated";

type Props = {};

const About = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <AnimatedGradient />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Does This show up? Yes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
  },
});

export default About;

/* 
 <MotionView className="filter flex-1 items-center justify-center">
      <Motion.View
    initial={{ x: -100,
    scale: 0,
    opacity: 0.1
   }}
    animate={{ x: 0,
    scale: 1,
    opacity: 1 }}
    transition={{
        default: {
            type: "spring",
            damping: 20,
            stiffness: 300,
        },
        x: {
            type: "spring",
            damping: 20,
            stiffness: 1000
        },
        opacity: {
            type: "tween",
            duration: 2000
        },
    }}
>
  <Text>Does This slide?</Text>
</Motion.View>
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
    backgroundColor: '#f8b935',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
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
    </MotionView>


*/
