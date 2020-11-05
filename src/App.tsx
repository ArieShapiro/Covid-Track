import React, { useEffect, useState } from 'react';

import { getData } from './service/http';
import TableView from './components/TableView';
import ChartView from './components/ChartView';

import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import BlurLinearIcon from '@material-ui/icons/BlurLinear';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles({
	topBar: {
		margin: 'auto',
		display: 'flex',
	},
	title: {
		margin: '0 10px',
	},
	navSection: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	navBtns: {
		color: '#5d5d65',
		margin: '20px 0',
		width: '10vw',
		display: 'flex',
		justifyContent: 'space-evenly',
	},
});

function App() {
	const classes = useStyles();
	const [state, setState] = useState<State | null>(null);
	const [dataToView, setDataToView] = useState<Country[] | null | undefined>(null);
	const [isTable, setIsTable] = useState<boolean>(true);
	const [isGlobalChart, setIsGlobalChart] = useState<boolean>(false);

	useEffect(() => {
		getData('https://api.covid19api.com/summary').then((res: State) => {
			setState(res);
			setDataToView(res.Countries);
		});
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const value: string = e.target.textContent || e.target.value;

		const filtered =
			value &&
			state?.Countries.filter((country: Country) => country.Country.toLowerCase() === value.toLowerCase());

		if (filtered && filtered.length) {
			setDataToView(filtered);
		} else if (!value) {
			setDataToView(state?.Countries);
		}
	};

	const toggleGlobalChart = () => {
		setIsGlobalChart((prev) => !prev);
	};

	return (
		<div>
			<AppBar position="sticky">
				<Toolbar>
					<div className={classes.topBar}>
						<TrackChangesIcon />
						<Typography variant="subtitle1" className={classes.title}>
							COVID TRACK
						</Typography>
					</div>
				</Toolbar>
			</AppBar>
			{!state && <LinearProgress variant="indeterminate" />}
			{state && dataToView && (
				<>
					<div className={classes.navSection}>
						<Autocomplete
							style={{ width: 300 }}
							onInputChange={(e: any) => {
								handleInputChange(e);
							}}
							options={state.Countries}
							getOptionLabel={(option: Country) => option.Country}
							renderInput={(params: {}) => (
								<TextField {...params} label="Search country" variant="outlined" margin="normal" />
							)}
							renderOption={(option: Country, { input }: any) => {
								const matches = match(option.Country, input);
								const parts = parse(option.Country, matches);

								return (
									<div>
										{parts.map((part, index) => (
											<span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
												{part.text}
											</span>
										))}
									</div>
								);
							}}
						/>
						{!isTable && (
							<IconButton style={{ height: '50px', marginTop: '10px' }} onClick={toggleGlobalChart}>
								<PublicIcon />
							</IconButton>
						)}
						<div className={classes.navBtns}>
							<IconButton
								onClick={() => {
									setIsTable(true);
								}}
							>
								<BlurLinearIcon />
							</IconButton>
							<IconButton
								onClick={() => {
									setIsTable(false);
								}}
							>
								<EqualizerIcon />
							</IconButton>
						</div>
					</div>
					{isTable ? (
						<TableView dataToView={dataToView} globalData={state.Global} />
					) : (
						<ChartView dataToView={dataToView} globalData={state.Global} isGlobalChart={isGlobalChart}/>
					)}
				</>
			)}
		</div>
	);
}

export default App;
