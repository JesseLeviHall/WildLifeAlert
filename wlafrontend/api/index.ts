import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// set axios configurations
//remote server for now: http://54.177.204.144
//locoal server: http://10.0.10.10:3000
const API = axios.create({
	baseURL: 'http://10.0.10.10:3000',
	timeout: 10000,
	withCredentials: false,
});

// Set Token to be in header in subsequent reqs after login or signup
API.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	config.headers['X-WildlifeAlert'] = 'acceptableRequest';
	return config;
});

//**************************define the queryFn for the query in the components.

//get the homescreen content:
export const getHomeScreenContent = async () => {
	try {
		const homescreencontent = await API.get('/api/homescreen');
		return homescreencontent.data;
	} catch (error) {
		console.error(error);
	}
}
	

//get the public map data of rescue alerts:
export const getPubData = async () => {
	try {
		const pubdata = await API.get('/api/publicmapgeopos');
		return pubdata.data;
	}
	catch (error) {
		console.error(error);
	}
}



//get alert details for rescuers:
export const getAlertDetails = async (id: number) => {
	try {
		const alertdetails = await API.get(`/api/alertdetails/${id}`);
		return alertdetails.data;
	}
	catch (error) {
		console.error(error);
	}
} 


//Get Public Map Info Dialogue content
export const getPubMapDialogueContent = async () => {
	try {
		const pubmapdialoguecontent = await API.get('/api/publicmapscreen');
		return pubmapdialoguecontent.data;
	}
	catch (error) {
		console.error(error);
	}
}