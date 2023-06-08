import * as React from "react";
import { Dimensions } from "react-native";
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {};

const AnimatedGradient = (props: Props) => {
  const [value, setValue] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => !prev);
    }, 9000);
    return () => clearInterval(interval);
  }, []);
  return (
    <MotionLinearGradient
      animateProps={{
        colors: [value ? "#6495ed" : "#eb8d13", value ? "#0f45a8" : "#c6ed02"],
        start: { x: 0, y: 0 },
        end: { x: value ? 1 : 0, y: 1 },
      }}
      transition={{
        type: "timing",
        duration: 9000,
        easing: "linear",
      }}
      style={{
        height: screenHeight,
        width: screenWidth,
        margin: 0,
        padding: 0,
      }}
    ></MotionLinearGradient>
  );
};

export default AnimatedGradient;
