import React from "react";
import { Platform, SafeAreaView } from "react-native";

type Props = {
  children: React.ReactNode;
};

const ConditionalSafeAreaView: React.FC<Props> = ({ children }) => {
  const isAndroid = Platform.OS === "android";

  if (isAndroid) {
    return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
  }

  return <>{children}</>;
};

export default ConditionalSafeAreaView;
