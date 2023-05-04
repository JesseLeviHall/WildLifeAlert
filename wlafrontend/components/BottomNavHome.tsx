/*

import * as  React from 'react'
import { BottomNavigation, Text } from 'react-native-paper';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  SendForHelp: undefined;
  About: undefined;
  RescuerLogin: undefined;
  Resources: undefined
};

type HomeBottomNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigate(arg0: string): unknown;
  addListener<T>(arg0: string, arg1: () => void): unknown;
  navigation: HomeBottomNavigationProp;
};

const RescuersRoute = () => <Text>Rescuer Login</Text>;

const PublicMapRoute = () => <Text>Public Map</Text>;

const ResourcesRoute = () => <Text>Resources</Text>;

const AboutRoute = () => <Text>About</Text>;


const BottomNavHome = (props: Props) => {

  const navigation = useNavigation<HomeBottomNavigationProp>();

  const [index, setIndex] = React.useState(0);
  
  const [routes] = React.useState([
  { key: 'RescuerLogin', title: 'Rescuers', focusedIcon: 'launch', screen: 'RescuerLogin' },
  { key: 'PublicMap', title: 'Live Map', focusedIcon: 'latitude', screen: 'PublicMap' },
  { key: 'Resources', title: 'Resources', focusedIcon: 'magnify-expand', screen: 'Resources' },
  { key: 'About', title: 'About', focusedIcon: 'lightbulb-on', unfocusedIcon: 'lightbulb-on-outline', screen: 'About' },
]);

  
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={({ route, jumpTo }) => {
        switch (route.key) {
          case 'rescuers':
            return <RescuersRoute />;
          case 'publicmap':
            return <PublicMapRoute />;
          case 'resources':
            return <ResourcesRoute />;
          case 'about':
            return <AboutRoute />;
          default:
            return null;
        }
      }}
      activeColor='#6d613b'
      inactiveColor='#000000'
      barStyle={{ backgroundColor: '#e1dedb' }}
      sceneAnimationEnabled={true}
      sceneAnimationType='opacity'
      keyboardHidesNavigationBar={true}
      onTabPress={(scene: any) => {
      const route = routes[scene.route.screen as number];
       if (route) {
         navigation.navigate(route.screen);
        }
      }}

    />
  );
};


export default BottomNavHome

*/