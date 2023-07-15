import React from "react";
import { Text } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StackParams = {
  AlertDetails: { alertId: string };
};

type AlertDetailsScreenRouteProp = RouteProp<StackParams, "AlertDetails">;
type AlertDetailsNavigationProp = NativeStackNavigationProp<StackParams, "AlertDetails">;

type Props = {
  route: AlertDetailsScreenRouteProp;
  navigation: AlertDetailsNavigationProp;
};

const AlertDetails: React.FC<Props> = ({ route, navigation }) => {
  const { alertId } = route.params;
  return <Text>AlertDetails: {alertId}</Text>;
};

export default AlertDetails;

/* const AlertDetailsQuery = useQuery({
    queryKey: ['AlertDetails', id],
    queryFn: () => getAlertDetails(id),
  })
  if(AlertDetailsQuery.status === 'loading') return <Text>Loading</Text>
  if(AlertDetailsQuery.status === 'error') return <Text>{JSON.stringify(AlertDetailsQuery.error)}</Text>
  */
