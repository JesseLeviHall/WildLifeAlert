import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";
import { Motion } from "@legendapp/motion";
import SvgSun from "./SunSvg";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {};

const HomeBackG = (props: Props) => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (value === 1) {
      setValue(0);
    }
    setTimeout(() => {
      setValue(0);
    }, 50000);
    setValue(1);
  }, []);

  return (
    <View>
      <MotionLinearGradient
        animateProps={{
          colors: [
            // on screen: 1 bot-right low, 2 bot-r high, 3 top-left low, 4 top-left high
            value === 1 ? "#0f45a8" : "#c6ed02",
            value === 1 ? "#eb8d13" : "#6495ed",
          ],
          start: { x: value === 1 ? 1 : 0, y: 1 },
          end: { x: 0, y: 0 },
        }}
        transition={{
          type: "timing",
          duration: 50000,

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
        animate={{ y: value === 1 ? screenHeight / 2 : -150 }}
        transition={{
          type: "timing",
          duration: 50000,
          easing: "linear",
        }}
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          left: screenWidth / 2 - 20,
          borderRadius: 108,
        }}
      >
        <SvgSun />
      </Motion.View>
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
