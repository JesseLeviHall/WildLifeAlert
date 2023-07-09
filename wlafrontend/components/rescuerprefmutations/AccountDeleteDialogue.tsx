import * as React from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, Provider, Text } from "react-native-paper";
import { useMutation } from "@tanstack/react-query/build/lib";
import { useAuth } from "@clerk/clerk-expo";
import { deleteAccount } from "../../api/index";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useConnectivity } from "../../hooks/useConnectivity";

type RootStackParamList = {
  HomeScreen: undefined;
};

type HomeScreenProp = NavigationProp<RootStackParamList, "HomeScreen">;

type Props = {
  navigation: HomeScreenProp;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountDeleteDialogue = ({ visible, setVisible }: Props) => {
  const navigation = useNavigation<HomeScreenProp>();
  const isConnected = useConnectivity();
  const { sessionId, getToken, signOut } = useAuth();
  const [token, setToken] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
      }
    };
    fetchToken();
  }, []);

  const mutation = useMutation(deleteAccount, {
    onSuccess: () => {
      console.log("Account Deleted");
      signOut();
      navigation.navigate("HomeScreen");
    },
    onError: (error) => {
      console.error("Error: ", error);
    },
  });

  const handleDelete = () => {
    if (!isConnected) return;
    if (mutation.isLoading || mutation.error) return;
    try {
      setError("");
      if (sessionId && token !== null) {
        mutation.mutate({ sessionId, token });
      } else {
        throw new Error("Session ID, token, or user details is undefined");
      }
      setVisible(false);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete Account</Dialog.Title>
          <Text className="block mt-4 px-6">
            Are you sure? All of your information will be permanently deleted
            like you were never here.
          </Text>
          <View className="flex-row col-span-1 mt-12 self-start">
            <Dialog.Actions>
              <Button onPress={handleDelete}>Delete</Button>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default AccountDeleteDialogue;
