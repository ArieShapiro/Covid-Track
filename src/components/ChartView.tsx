import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
	Chart,
	BarSeries,
	Title,
	ArgumentAxis,
	ValueAxis,
	LineSeries,
	Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
	papar: {
		width: '500px',
		margin: 'auto',
		display: 'flex',
	},
	iconBtn: {
		height: '50px',
	},
});

export interface ChartViewProps {
	dataToView: Country[] | null | undefined;
	globalData: Global;
	isGlobalChart: boolean;
}

const ChartView: React.FC<ChartViewProps> = ({ dataToView, globalData, isGlobalChart }) => {
	const classes = useStyles();
	const [pageIdx, setPageIdx] = useState<number>(0);

	const handleNav = (direction: string) => {
		if (direction === 'forward' && dataToView && pageIdx <= dataToView.length - 8) {
			setPageIdx((prev) => prev + 7);
		} else if (pageIdx >= 7) {
			setPageIdx((prev) => prev - 7);
		}
	};
	return (
		<div>
			{isGlobalChart ? (
				<Paper className={classes.papar}>
					<div style={{ margin: 'auto' }}>
						<Chart
							width={300}
							data={[
								{
									argument: 'Active Cases',
									value: globalData.TotalConfirmed,
								},
								{
									argument: 'Deaths',
									value: globalData.TotalDeaths,
								},
								{
									argument: 'Recovered',
									value: globalData.TotalRecovered,
								},
							]}
						>
							<ArgumentAxis />
							<ValueAxis />
							<Title text="Global Data" />

							<BarSeries valueField="value" argumentField="argument" />
						</Chart>
					</div>
				</Paper>
			) : (
				<div>
					{dataToView && (
						<>
							{dataToView.length > 1 ? (
								<div style={{ display: 'flex' }}>
									<IconButton
										className={classes.iconBtn}
										onClick={() => {
											handleNav('back');
										}}
									>
										<ArrowBackIcon />
									</IconButton>
									<Paper className={classes.papar} style={{width:'1000px'}}>
										<Chart
											width={1000}
											data={dataToView?.slice(pageIdx, pageIdx + 8).map((c: Country) => ({
												country: c.Country,
												active: c.TotalConfirmed,
												deaths: c.TotalDeaths,
												recovered: c.TotalRecovered,
											}))}
										>
											<ArgumentAxis />
											<ValueAxis />

											<Title
												text={
													dataToView.length > 1
														? `${pageIdx + 1} - ${
																pageIdx + 8 >= dataToView.length
																	? dataToView.length
																	: pageIdx + 8
														  } of ${dataToView.length}`
														: ``
												}
											/>
											<LineSeries
												name="Active Cases"
												valueField="active"
												argumentField="country"
											/>
											<LineSeries name="Deaths" valueField="deaths" argumentField="country" />
											<LineSeries
												name="Recovered"
												valueField="recovered"
												argumentField="country"
											/>
											<Legend position="bottom" />
										</Chart>
									</Paper>
									<IconButton
										className={classes.iconBtn}
										onClick={() => {
											handleNav('forward');
										}}
									>
										<ArrowForwardIcon />
									</IconButton>
								</div>
							) : (
								<Paper className={classes.papar}>
									<div style={{ margin: 'auto' }}>
										<Chart
											width={300}
											data={[
												{
													argument: 'Active Cases',
													value: dataToView[0].TotalConfirmed,
												},
												{
													argument: 'Deaths',
													value: dataToView[0].TotalDeaths,
												},
												{
													argument: 'Recovered',
													value: dataToView[0].TotalRecovered,
												},
											]}
										>
											<ArgumentAxis />
											<ValueAxis />
											<Title text={dataToView[0].Country} />

											<BarSeries valueField="value" argumentField="argument" />
										</Chart>
									</div>
								</Paper>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ChartView;
