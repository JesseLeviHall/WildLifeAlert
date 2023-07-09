//Clerk Delete
//Database Delete
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AccountDeleteDialogue from "./AccountDeleteDialogue";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenProp = NavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenProp;
};

const DeleteAccount = ({ toggleDialog }: { toggleDialog: () => void }) => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View className="justify-center mb-3 items-center align-bottom h-10 ">
      <TouchableOpacity onPress={toggleDialog}>
        <Text className="text-base text-center mx-3 text-white font-thin">
          Delete Account?
        </Text>
      </TouchableOpacity>
      {visible && (
        <AccountDeleteDialogue
          navigation={navigation}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </View>
  );
};

export default DeleteAccount;
