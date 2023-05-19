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
import { useQuery } from '@tanstack/react-query/build/lib';
import { getHomeScreenContent } from '../api/index';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import {  useConnectivity } from '../hooks/useConnectivity';
import SpinnerComp from '../components/Spinner';
import OfflineToast from '../components/OfflineToast';
import HomeNavBot from '../components/HomeNavBot';

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
	const isConnected  =  useConnectivity();
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

	const { isLoading, refetch, data, error } = useQuery(
    ['HomeScreen'],
    () => getHomeScreenContent(),
    { enabled: isConnected }
  );

	const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

	if (isLoading || isRefetchingByUser) {
		return <View><SpinnerComp /></View>;
	}

	if (error) {
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
							damping: 20,
							stiffness: 800,
							mass: 2,
						},
						opacity: {
							type: 'tween',
							duration: 1000,
						},
					}}>
					<View className='mt-12 h-96 flex flex-col items-center'>
						<View className=' mt-9 max-h-9  flex-1 py-1 px-4 align-middle justify-center  bg-[#77CFCA] rounded-xl'>
							<Text className='font-bold text-lg text-[#24374b]'>
								{data?.Message}
							</Text>
						</View>
						<Text className='font-black mt-5 mix-blend-color  uppercase text-[#24374b] text-3xl'>
							{data?.Title}
						</Text>
						<Text className=' text-2xl text-center px-4 text-[#24374b] font-light'>
							{data?.Description}
						</Text>
					</View>
					{isConnected? null : <OfflineToast />}
					<View className='mt-11 flex-1 align-middle justify-center'>
						<View className='flex flex-col items-center'>
							<View className='flex-1 align-middle justify-center w-44 h-44 border border-spacing-10 border-[#15ff00fe] rounded-full flex flex-col items-center bg-[#009DAD]'>
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
		backgroundColor: '#15ff00',
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
