import * as React from "react";
import { View, Text } from "react-native";
import { Motion } from "@legendapp/motion";
import { styled } from "nativewind";

const MotionView = styled(View);

type Props = {
  message: string;
};

const SuccessToast = (props: Props) => {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => !prev);
    }, 400); // Adjust this interval for faster or slower bounces
    return () => clearInterval(interval);
  }, []);

  return (
    <MotionView style={{ flex: 1, justifyContent: "flex-end" }}>
      <Motion.View
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: value ? 50 : -50, opacity: 1 }} // Adjust these values for bigger or smaller bounces
        exit={{ opacity: 0 }}
        transition={{
          y: {
            type: "spring",
            damping: 30,
            stiffness: 30,
          },
          opacity: {
            type: "tween",
            duration: 500,
          },
        }}
        style={{
          backgroundColor: "#bad1e8",
          opacity: 0.5,
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: "1%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {props.message}
        </Text>
      </Motion.View>
    </MotionView>
  );
};

export default SuccessToast;
