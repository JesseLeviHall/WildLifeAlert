import * as React from "react";
import { Dimensions, View, Image, StyleSheet } from "react-native";
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";
import { Motion } from "@legendapp/motion";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {};

const HomeBackG = (props: Props) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 40000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <MotionLinearGradient
        animateProps={{
          colors: [
            value === 1 ? "#05e8c2" : "#170fa8",
            value === 1 ? "#03ff14" : "#a8660f",
          ],
          start: { x: value === 1 ? 1 : 0, y: 1 },
          end: { x: 0, y: 0 },
        }}
        transition={{
          type: "timing",
          duration: 40000,
          easing: "linear",
        }}
        style={{
          height: screenHeight,
          width: screenWidth,
          margin: 0,
          padding: 0,
        }}
      ></MotionLinearGradient>
      <Motion.View
        initial={{ y: screenHeight / 4 }}
        animate={{ y: value === 1 ? -100 : screenHeight / 2 }}
        transition={{
          type: "timing",
          duration: 40000,
          easing: "linear",
        }}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          left: screenWidth / 2 - 20,
          borderRadius: 108,
          borderWidth: 2,
          borderColor: "#15ff00fe",
        }}
      ></Motion.View>
    </View>
  );
};

export default HomeBackG;

const styles = StyleSheet.create({
  image: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
});

/* 
  <Motion.View
        initial={{ x: -150 }}
        animate={{ x: value === 1 ? screenWidth + 150 : -150 }}
        transition={{
          type: "timing",
          duration: 9000,
          easing: "linear",
        }}
        style={{
          position: "absolute",
          top: 50,
          width: 100,
          height: 100,
          borderRadius: 108,
          borderWidth: 2,
          borderColor: "#15ff00fe",
        }}
      ></Motion.View> */
