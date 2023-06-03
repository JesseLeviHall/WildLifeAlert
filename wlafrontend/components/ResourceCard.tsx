import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Linking } from "react-native";
import { StyleProp, ViewStyle } from "react-native";

interface LeftContentProps {
  size: number;
  color?: string;
}

type Resource = {
  Icon: string;
  ResourceType: string;
  Title: string;
  Description: string;
  Image: string;
  Url: string;
  ButtonText: string;
};

type ResourceCardProps = {
  resource: Resource;
};

const LeftContent = (props: LeftContentProps): JSX.Element => (
  <Avatar.Icon {...props} icon="web" size={30} />
);

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card style={{ backgroundColor: "rgb(224 242 254)", marginBottom: 12 }}>
      <Card.Title
        title=""
        subtitle={resource.ResourceType}
        left={LeftContent}
      />
      <Card.Content>
        <Text variant="titleLarge">{resource.Title}</Text>
        <Text className="mb-2" variant="bodyMedium">
          {resource.Description}
        </Text>
      </Card.Content>
      <Card.Cover source={{ uri: `${resource.Image}` }} />
      <Card.Actions>
        <Button
          className="m-2"
          mode="contained-tonal"
          onPress={() => Linking.openURL(`${resource.Url}`)}
        >
          {resource.ButtonText}
        </Button>
      </Card.Actions>
    </Card>
  );
};
export default ResourceCard;
