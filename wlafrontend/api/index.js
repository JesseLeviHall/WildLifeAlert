import axios from 'axios';

//here is where we define the querFn for the query in the components.
export function getData() {
	return axios.get('http://localhost:3000/api/data');
}
