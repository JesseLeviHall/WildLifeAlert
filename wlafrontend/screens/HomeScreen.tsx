import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
	Text,
	View,
	RefreshControl,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Surface } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import SpinnerComp from '../components/Spinner';
import HomeNavBot from '../components/HomeNavBot';

const screenHeight = Dimensions.get('window').height;

type RootStackParamList = {
	Home: undefined;
	SendForHelp: undefined;
	PublicMap: undefined;
	About: undefined;
	RescuerLogin: undefined;
	Resources: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type Props = {
	navigation: HomeScreenNavigationProp;
};

const Home = (props: Props) => {
	const navigation = useNavigation<HomeScreenNavigationProp>();
	const handlePress = async () => {
		// Delay the navigation using setTimeout
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 300); // Adjust the delay duration as needed (in milliseconds)
		});

		navigation.navigate('SendForHelp');
	};

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

	if (isLoading || isRefetchingByUser) {
		return <SpinnerComp />;
	}

	if (error) {
		return <Text>{JSON.stringify(error)}</Text>;
	}

	return (
		<LinearGradient
			style={{ height: screenHeight }}
			colors={['#33fff2', '#b8d1db', '#a6cedd']}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={isRefetchingByUser}
						onRefresh={refetchByUser}
					/>
				}>
				<Surface
					elevation={1}
					style={{
						height: 150,
						backgroundColor: '#33fff2',
					}}>
					<Text className='mt-20 text-center font-black text-[#1c3956] text-5xl'>
						WildLifeAlert
					</Text>
				</Surface>
				<View className='mt-12 flex flex-col items-center '>
					<Text className=' text-[#2a527a] mb-2'>{data?.Message}</Text>
					<Text className='font-bold uppercase text-[#2a527a] text-3xl'>
						{data?.Title}
					</Text>
					<Text className=' mt-3 text-2xl text-center px-4 text-[#2a527a] font-light'>
						{data?.Description}
					</Text>
				</View>
				<View className='mt-11 flex-1 align-middle justify-center'>
					<View className='flex flex-col items-center'>
						<View className='flex-1 align-middle justify-center w-64 h-64 border border-spacing-10 border-[#f8b935] rounded-full flex flex-col items-center bg-[#bad1e8]'>
							<TouchableOpacity onPress={handlePress}>
								<View
									style={{
										height: 220,
										width: 220,
										borderRadius: 108,
										backgroundColor: '#f8b935',
										justifyContent: 'center',
										alignItems: 'center',
										margin: 6,
										padding: 0,
										shadowOffset: { width: 2, height: 2 },
										shadowColor: '#000',
										shadowOpacity: 0.25,
									}}>
									<Text className='text-center uppercase text-2xl font-bold text-[#2a527a]'>
										Start Alert
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
			<View className='sticky bottom-0'>
				<HomeNavBot navigation={navigation} />
			</View>
		</LinearGradient>
	);
};

export default Home;
