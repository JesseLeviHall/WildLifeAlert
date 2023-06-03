import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Linking } from "react-native";

interface LeftContentProps {
  size: number;
  color?: string;
  icon: string;
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
  <Avatar.Icon {...props} icon={props.icon} size={30} />
);

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <Card style={{ backgroundColor: "rgb(224 242 254)", marginBottom: 12 }}>
      <Card.Title
        title=""
        subtitle={resource.ResourceType}
        left={(props) => <LeftContent {...props} icon={resource.Icon} />}
      />
      <Card.Content>
        <Text className=" font-medium mb-1" variant="titleLarge">
          {resource.Title}
        </Text>
        <Text className="mb-2 font-bold" variant="bodyMedium">
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
