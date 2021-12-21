import { Center } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';

const classic = {
	menuTextColor: '#FFFFFF',
	mainTextColor: '#FFFFFF',
	darkBlue: '#0C1D47',
	indigo: '#5C6BC0',
};
const UseStylesSideBar = makeStyles(theme => ({
	drawerTitleSpan: {
		display: 'block',
		textAlign: 'center',
		fontWeight: 300,
		color: '#BEBEBE',
		'&.name': {
			fontSize: '24px',
			fontWeight: 'Bold',
		},
		'&.version': {
			fontSize: '9px',
		},
	},
	divider: {},
	list: {
		width: '250px',
		borderRadius: '5px',
		width: '100%',
		fontSize: '18px',
	},
	litsItem: {
		color: '#000000',
	},
	selected: {
		backgroundColor: classic.indigo,
	},
	collapseTitle: {
		color: '#00000',
		paddingLeft: '20px',
		fontSize: '20px',
	},
	colorPrimary: {
		backgroundColor: '#FFFFFF',
	},
	contentHeaderTitle: {
		fontWeight: 'bold',
		color: '#878787',
		fontSize: '14px',
		display: 'flex',
	},
	contentHeaderTitleLeft: {

	},
	contentHeaderRight: {
		marginLeft: 'auto',
	},
}));

export default UseStylesSideBar;
