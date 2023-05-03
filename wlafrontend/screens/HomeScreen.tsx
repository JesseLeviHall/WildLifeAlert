import React, { useLayoutEffect }  from 'react';
import { Button, View, Text, RefreshControl,SafeAreaView, ScrollView } from 'react-native';

import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRefreshByUser } from '../hooks/useRefreshByUser';


type RootStackParamList = {
  Home: undefined;
  AnotherScreen: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type Props = {
  navigation: HomeScreenNavigationProp;
};



const Home = (props: Props) => {
   const navigation = useNavigation<HomeScreenNavigationProp>();
  useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});
  
  const { isLoading, refetch, data, error } = useQuery({
    queryKey: ['HomeScreen'],
    queryFn: () => getHomeScreenContent(),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

 

  return (
    <SafeAreaView className='h-screen'>
       <ScrollView refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }>
      <Text>{data?.Title}</Text>
      <Text>{data?.Description}</Text>
      <Text>{data?.Message}</Text>
      <Button
        title='Go To Another Screen'
        onPress={() => navigation.navigate('AnotherScreen')}
      />
    </ScrollView>
    </SafeAreaView>
   
  );
};

export default Home;
