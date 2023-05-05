import React, { useLayoutEffect }  from 'react';
import { Button, Text, View, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import { Box } from "native-base";
import  SpinnerComp  from '../components/Spinner';
import HomeNavBot from '../components/HomeNavBot';


type RootStackParamList = {
  Home: undefined;
  SendForHelp: undefined;
  PublicMap: undefined;
  About: undefined;
  RescuerLogin: undefined;
  Resources: undefined
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home' >;
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
  
  if (isLoading || isRefetchingByUser ) {
    return (
      <SpinnerComp />
    );
  }

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <View className='h-screen '>
       <ScrollView refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }>
        <View className='border border-dashed border-red-700'> 
        <Box  safeArea>Hello</Box>
      <Text>{data?.Title}
       </Text>
      <Text>{data?.Description}</Text>
      <Text className='mb-44'>{data?.Message}</Text>
      </View>
      <View className='border border-dotted border-blue-600'>
      <Button 
        title='Post A Rescue Alert'
        onPress={() => navigation.navigate('SendForHelp')}
      />
      </View>
    </ScrollView>
     <View className='sticky bottom-0'>
      <HomeNavBot navigation={navigation} />
      </View>
    </View>
  );
};

export default Home;
