import axios from 'axios';

//where we define the queryFn for the query in the components.

//for the public display of rescue data:
export function getPubData() {
	return axios.get('http://localhost:3000/api/pubdata');
}

//get alert details for rescuers:
export function getAlertDetails(id) {
	return axios.get('http://localhost:3000/api/alertdetails');
}
