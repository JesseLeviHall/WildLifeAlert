import React from "react";
import { View, Text } from "react-native";

type Props = {
  message: string;
};

const SuccessToast = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View
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
      </View>
    </View>
  );
};

export default SuccessToast;
