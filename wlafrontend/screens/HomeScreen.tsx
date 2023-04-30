import React from 'react';
import { Button, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getHomeScreenContent } from '../api/index.js';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  AnotherScreen: undefined;
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = (props: Props) => {
  
  const HomeScreenQuery = useQuery({
    queryKey: ['HomeScreen'],
    queryFn: () => getHomeScreenContent(),
  });

  if (HomeScreenQuery.status === 'loading') return <Text>Loading</Text>;
  if (HomeScreenQuery.status === 'error')
    return <Text>{JSON.stringify(HomeScreenQuery.error)}</Text>;


  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{HomeScreenQuery.data?.Title}</Text>
      <Button
        title='Go To Another Screen'
        onPress={() => navigation.navigate('AnotherScreen')}
      />
    </View>
  );
};

export default Home;

