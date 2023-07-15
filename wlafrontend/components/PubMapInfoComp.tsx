import * as React from "react";
import { ScrollView, Dimensions } from "react-native";
import { Button, Dialog, Portal, Provider, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query/build/lib";
import { getPubMapDialogueContent } from "../api/index";
import { useNavigation, NavigationProp } from "@react-navigation/core";

const ScreenHeight = Dimensions.get("window").height;

type RootStackParamList = {
  RescuerLogin: undefined;
};
type MapScreenDialogueProp = NavigationProp<RootStackParamList, "RescuerLogin">;
type Props = {
  infoVisible: boolean;
  setInfoVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PubMapDialogue = ({ setInfoVisible, infoVisible }: Props) => {
  const hideDialog = () => setInfoVisible(false);
  const navigation = useNavigation<MapScreenDialogueProp>();
  const { data, error, refetch } = useQuery({
    queryKey: ["PubMapDialogue"],
    queryFn: () => getPubMapDialogueContent(),
    enabled: false, // Initially disabled, will be enabled when the dialog opens
  });

  React.useEffect(() => {
    if (infoVisible) {
      refetch(); // Fetch the data when the dialog becomes visible
    }
  }, [infoVisible, refetch]);

  if (error) {
    console.log(error);
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <Provider>
      <Portal>
        <Dialog style={{ marginTop: -40 }} visible={infoVisible} onDismiss={hideDialog}>
          <Dialog.Title>{data?.Title}</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Text className="block">
                {data?.Description}
                {"\n\n"}
                {data?.Message}
              </Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button style={{ marginRight: 10 }} onPress={() => navigation.navigate("RescuerLogin")}>
              Rescuer Portal
            </Button>
            <Button style={{ marginRight: 60, marginLeft: 40 }} onPress={hideDialog}>
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export default PubMapDialogue;
