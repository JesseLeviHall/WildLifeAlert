import React, { useState }  from 'react';
import { Button, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
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
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['HomeScreen'],
    queryFn: () => getHomeScreenContent(),
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{data?.Title}</Text>
      <Text>{data?.Description}</Text>
      <Text>{data?.Message}</Text>
      <Button
        title='Go To Another Screen'
        onPress={() => navigation.navigate('AnotherScreen')}
      />
    </View>
  );
};

export default Home;
