//set the location for the resucer
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SetLocationDialogue from "./SetLocationDialogue ";

type Props = {
  isOpen: () => void;
  LatitudeProp: string;
  LongitudeProp: string;
};

const SetResLocation = ({ isOpen, LatitudeProp, LongitudeProp }: Props) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View className="justify-center mb-3 items-center align-bottom h-10 ">
      <TouchableOpacity
        className=" border border-cyan-500 rounded-full justify-center items-center px-4 py-2 "
        onPress={isOpen}
      >
        <Text className="text-base text-center mx-3 text-white font-extralight">
          Change Location?
        </Text>
      </TouchableOpacity>
      {visible && (
        <SetLocationDialogue
          visible={visible}
          setVisible={setVisible}
          LatitudeProp={LatitudeProp}
          LongitudeProp={LongitudeProp}
        />
      )}
    </View>
  );
};

export default SetResLocation;
