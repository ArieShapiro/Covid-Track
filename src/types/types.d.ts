interface State {
	Global: Global;
	Countries: Country[];
}

interface Global {
	TotalConfirmed: number;
	TotalDeaths: number;
	TotalRecovered: number;
}

interface Country {
	Country: string;
	TotalConfirmed: number;
	TotalDeaths: number;
	TotalRecovered: number;
}
