import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query/build/lib';
import { getPubData } from '../api/index';
import SpinnerComp from '../components/Spinner';

interface Alert {
	id: string;
	position: string[];
}

export default function PubMapView() {
	const {
		isLoading,
		data: alerts,
		error,
	} = useQuery<Alert[], Error>(['PubMapView'], getPubData);

	if (isLoading) {
		return <SpinnerComp />;
	}

	if (error) {
		return <Text>{JSON.stringify(error)}</Text>;
	}

	
	return (
		<View style={styles.container}>
			<MapView
				initialRegion={{
					latitude: 39.5,
					longitude: -98.35,
					latitudeDelta: 50, // Adjust as necessary
					longitudeDelta: 50, // Adjust as necessary
				}}
				style={styles.map}>
				{alerts.map((alert: Alert) => (
					<Marker
						key={alert.id}
						coordinate={{
							latitude: parseFloat(alert.position[0]),
							longitude: parseFloat(alert.position[1]),
						}}
					/>
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
