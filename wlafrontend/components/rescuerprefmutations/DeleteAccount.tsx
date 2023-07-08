//Clerk Delete
//Database Delete
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AccountDeleteDialogue from "./AccountDeleteDialogue";

type Props = {};

const DeleteAccount = ({ toggleDialog }: { toggleDialog: () => void }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View className="justify-center mb-3 items-center align-bottom h-10 ">
      <TouchableOpacity onPress={toggleDialog}>
        <Text className="text-base text-center mx-3 text-white font-thin">
          Delete Account?
        </Text>
      </TouchableOpacity>
      {visible && (
        <AccountDeleteDialogue visible={visible} setVisible={setVisible} />
      )}
    </View>
  );
};

export default DeleteAccount;
