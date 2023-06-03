import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Linking } from "react-native";

interface LeftContentProps {
  size: number;
  color?: string;
}

const LeftContent = (props: LeftContentProps): JSX.Element => (
  <Avatar.Icon {...props} icon="web" size={30} />
);

const ResourceCard = () => (
  <Card style={{ backgroundColor: "rgb(224 242 254)" }}>
    <Card.Title title="" subtitle="Online Resource" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">AnimalHelpNow.org</Text>
      <Text variant="bodyMedium">
        locate wildlife rescue organizations near you
      </Text>
    </Card.Content>
    <Card.Cover
      source={{ uri: "https://ahnow.org/images/weblink_large.png" }}
    />
    <Card.Actions>
      <Button
        mode="contained-tonal"
        onPress={() => Linking.openURL("https://ahnow.org")}
      >
        Visit
      </Button>
    </Card.Actions>
  </Card>
);
export default ResourceCard;
