import axios from 'axios';

export const getData = async (url: string): Promise<State> => {
	const { data } = await axios.get(url);

	const { Global, Countries } = data;

	return {
		Global,
		Countries,
	};
};
