import React, { useLayoutEffect } from 'react';
import {
	Text,
	View,
	RefreshControl,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
} from 'react-native';
import { Motion } from '@legendapp/motion';
import { Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import SpinnerComp from '../components/Spinner';
import HomeNavBot from '../components/HomeNavBot';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
			}, 300); // Adjust the delay
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
		console.log(error);
		return <Text>{JSON.stringify(error)}</Text>;
	}

	return (
		<ImageBackground
			className='flex-1'
			source={require('../assets/homescreen.png')}>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={isRefetchingByUser}
						onRefresh={refetchByUser}
					/>
				}>
				<Motion.View
					initial={{ x: -300, scale: 0, opacity: 0 }}
					animate={{ x: 0, scale: 1, opacity: 1 }}
					transition={{
						x: {
							type: 'spring',
							damping: 10,
							stiffness: 500,
						},
						opacity: {
							type: 'tween',
							duration: 1000,
						},
					}}>
					<View className='mt-12 flex flex-col items-center'>
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
							<View className='flex-1 align-middle justify-center w-44 h-44 border border-spacing-10 border-[#f8b935] rounded-full flex flex-col items-center bg-[#bad1e8]'>
								<TouchableOpacity onPress={handlePress}>
									<View style={styles.container}>
										<Text className='text-[#2a527a] font-bold text-2xl'>
											Start Alert
										</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Motion.View>
			</ScrollView>

			<View className='sticky bottom-0'>
				<HomeNavBot navigation={navigation} />
			</View>
		</ImageBackground>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8b935',
		margin: 6,
		padding: 0,
		height: 140,
		width: 140,
		borderRadius: 108,
		shadowOffset: { width: 3, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowColor: '#000',
		innerShadow: 6,
	},
});
