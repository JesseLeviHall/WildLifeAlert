import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';
import SetAlertLocationMap from '../../components/SetAlertLocationMap';


type RootStackParamList = {
	AddPhotos: undefined;
};
type AddPhotosProp = NavigationProp<RootStackParamList, 'AddPhotos'>;
type Props = {
	navigation: AddPhotosProp;
};
const screenHeight = Dimensions.get('window').height;


const SetLocation = (props: Props) => {
  const [locationSet, setLocationSet] = React.useState(false);
  const navigation = useNavigation<AddPhotosProp>();
  React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Set Location',
			 headerTintColor: '#000000', 
      headerStyle: { backgroundColor: '#71D1C7' },
		});
	});
  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
    <SetAlertLocationMap onLocationSet={setLocationSet}/>
    <View className='flex-1 align-middle justify-center'>
      <Text>Send For Help 3 SetLocation Screen</Text>
      <Button disabled={!locationSet} onPress={() => navigation.navigate('AddPhotos')}>Next</Button>
    </View>
    </LinearGradient>
  )
}

export default SetLocation