import * as React from 'react';
import { Text, RefreshControl, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Motion } from '@legendapp/motion';
import { useQuery } from '@tanstack/react-query/build/lib';
import { Appbar, FAB } from 'react-native-paper';
import { useRefreshByUser } from '../hooks/useRefreshByUser';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import PubMapView from '../components/PubMapView';
import PubMapDialogue from '../components/PubMapInfoComp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 70;
const MEDIUM_FAB_HEIGHT = 46;

const screenHeight = Dimensions.get('window').height;

type RootStackParamList = {
	Home: undefined;
};
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type Props = {
	navigation: HomeScreenNavigationProp;
};

const PublicMap = (props: Props) => {
	const [infoVisible, setInfoVisible] = React.useState(false);
	const showInfoDialog = () => setInfoVisible(true);
	const { bottom } = useSafeAreaInsets();
	const navigation = useNavigation<HomeScreenNavigationProp>();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});
	return (
		<LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
			<Appbar.Header className=''>
				<Appbar.BackAction
					onPress={() => {
						navigation.navigate('Home');
					}}
				/>
				<Appbar.Content title='Live Map' />
				<Appbar.Action icon='map' onPress={() => {}} />
				<Appbar.Action icon='more' onPress={showInfoDialog} />
			</Appbar.Header>
			{infoVisible ? (
				<PubMapDialogue
					setInfoVisible={setInfoVisible}
					infoVisible={infoVisible}
				/>
			) : null}
			<Motion.View
				className='flex-1 align-middle justify-center'
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
				<PubMapView />
			</Motion.View>

			<Appbar
				style={[
					styles.bottom,
					{
						height: BOTTOM_APPBAR_HEIGHT + bottom,
						backgroundColor: '#bad1e8',
					},
				]}
				safeAreaInsets={{ bottom }}>
				<Appbar.Action icon='archive' onPress={() => {}} />
				<Appbar.Action icon='email' onPress={() => {}} />
				<Appbar.Action icon='label' onPress={() => {}} />
				<Appbar.Action icon='delete' onPress={() => {}} />
				<FAB
					mode='flat'
					size='medium'
					icon='plus'
					onPress={() => {}}
					style={[
						styles.fab,
						{ top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
					]}
				/>
			</Appbar>
		</LinearGradient>
	);
};

export default PublicMap;

const styles = StyleSheet.create({
	bottom: {
		backgroundColor: 'aquamarine',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
	},
	fab: {
		position: 'absolute',
		right: 16,
	},
});
