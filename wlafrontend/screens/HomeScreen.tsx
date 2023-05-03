import React, { useLayoutEffect }  from 'react';
import { Button, Text, View, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import { Box } from "native-base";
import  SpinnerComp  from '../components/Spinner';
import BottomNavHome from '../components/BottomNavHome';


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
  
  if (isLoading || isRefetchingByUser ) {
    return (
      <SpinnerComp />
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
        <Animated.View entering={FadeInUp} > 
        <Box  safeArea>Hello</Box>
      <Text>{data?.Title}
       </Text>
       
      <Text>{data?.Description}</Text>
      <Text>{data?.Message}</Text>
      </Animated.View>
      <Button
        title='Go To Another Screen'
        onPress={() => navigation.navigate('AnotherScreen')}
      />
      <View className='position align-bottom'>
      <BottomNavHome />
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
