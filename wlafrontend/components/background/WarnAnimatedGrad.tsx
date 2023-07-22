import * as React from "react";
import { Dimensions, ImageBackground } from "react-native";
import { MotionLinearGradient } from "@legendapp/motion/linear-gradient-expo";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

type Props = {};

const WarnAnimatedGrad = (props: Props) => {
  const [value, setValue] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <MotionLinearGradient
      animateProps={{
        colors: [value ? "#FF0000" : "#80FF00", value ? "#5900EBFF" : "#FFA800FF"],
        start: { x: 0, y: 0 },
        end: { x: value ? 1 : 0, y: 1 },
      }}
      transition={{
        type: "timing",
        duration: 500,
        easing: "linear",
      }}
      style={{
        position: "absolute",
        height: 109,
        width: 252,
        borderRadius: 10,
        zIndex: -10,
      }}
    ></MotionLinearGradient>
  );
};

export default WarnAnimatedGrad;
