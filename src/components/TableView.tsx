import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export interface TableViewProps {
	dataToView: Country[] | null | undefined;
	globalData: Global;
}

const TableView: React.FC<TableViewProps> = ({ dataToView, globalData }) => {
	const classes = useStyles();
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>
							<Box fontWeight="fontWeightBold">Country</Box>
						</TableCell>
						<TableCell align="right">
							<Box fontWeight="fontWeightBold">Active Cases</Box>
						</TableCell>
						<TableCell align="right">
							<Box fontWeight="fontWeightBold">Deaths</Box>
						</TableCell>
						<TableCell align="right">
							<Box fontWeight="fontWeightBold">Recoveries</Box>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{dataToView?.map((row) => (
						<TableRow key={row.Country}>
							<TableCell component="th" scope="row">
								{row.Country}
							</TableCell>
							<TableCell align="right">{row.TotalConfirmed}</TableCell>
							<TableCell align="right">{row.TotalDeaths}</TableCell>
							<TableCell align="right">{row.TotalRecovered}</TableCell>
						</TableRow>
					))}
					{dataToView && dataToView.length > 1 && (
						<TableRow>
							<TableCell component="th" scope="row">
								<Box fontWeight="fontWeightBold">Total</Box>
							</TableCell>
							<TableCell align="right">
								<Box fontWeight="fontWeightBold">{globalData.TotalConfirmed}</Box>
							</TableCell>
							<TableCell align="right">
								<Box fontWeight="fontWeightBold">{globalData.TotalDeaths}</Box>
							</TableCell>
							<TableCell align="right">
								<Box fontWeight="fontWeightBold">{globalData.TotalRecovered}</Box>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableView;
