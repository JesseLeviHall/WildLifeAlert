import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Button } from 'native-base';
import SetAlertLocationMap from '../../components/SetAlertLocationMap';
import SuccessToast from '../../components/SuccessToast';


type RootStackParamList = {
	AddPhotos: undefined;
};
type AddPhotosProp = NavigationProp<RootStackParamList, 'AddPhotos'>;
type Props = {
	navigation: AddPhotosProp;
};
type UserLocation = {
  latitude: number;
  longitude: number;
};

const screenHeight = Dimensions.get('window').height;


const SetLocation = (props: Props) => {
  const [location, setLocation] = React.useState<UserLocation | null>(null);
  const [showToast, setShowToast] = React.useState(false);
  const navigation = useNavigation<AddPhotosProp>();

  React.useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Set Location',
			 headerTintColor: '#000000', 
      headerStyle: { backgroundColor: '#71D1C7' },
		});
	});

  React.useEffect(() => {
    if (location) {
      setShowToast(true);
      const timerId = setTimeout(() => {
        setShowToast(false);
      }, 2500);
      return () => clearTimeout(timerId);
    }
  }, [location]);
  

  const handleLocationSave = (locationIsSaved: boolean, savedLocation: UserLocation | null) => {
    setLocation(savedLocation);
    if (locationIsSaved) {
      setShowToast(true);
      const timerId = setTimeout(() => {
        setShowToast(false);
      }, 2500);
      return () => clearTimeout(timerId);
    }
  };

  return (
    <LinearGradient
			style={{ height: screenHeight }}
			colors={['#0DE69A', '#71D1C7', '#99BBE3']}>
    <SetAlertLocationMap onLocationSave={handleLocationSave}/>
    <View className='w-full border border-black flex-1 align-middle justify-center'>
      <Button className={`${location ? '' : 'bg-gray-300'} items-center w-24`} disabled={!location} onPress={() => navigation.navigate('AddPhotos')}>Next</Button>
    </View>
    {showToast && <SuccessToast />}
    </LinearGradient>
  )
}

export default SetLocation