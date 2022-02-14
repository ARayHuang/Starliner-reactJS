import React from 'react';
import TopBar from 'hp-swt-react-component/dest/esm/components/top-bar';
import PropTypes from 'prop-types';

const propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object,
	position: PropTypes.string,
	children: PropTypes.any,
	styled: PropTypes.object,
	childrenSx: PropTypes.object,
	userProfile: PropTypes.object,
};
const defaultProps = {
	classes: {
		appBar: '',
		toolBar: '',
	},
	styled: {
		m: '0',
	},
	userProfileSx: {
		'> span': {
			color: '#BBB !important',
		},
		'&::before': {
			height: '10px',
			width: '4px',
			backgroundColor: 'red',
		},
		button: {
			margin: '0 12px',
		},
	},
};
const userProfile = {
	username: 'Lin, Jennifer',
	userEmail: 'jennifer.lin@hp.com',
};

function AppBar({ className, classes, position, children, userProfileSx, styled }) {
	const { appBar, toolBar, colorPrimary } = classes;

	return (
		<TopBar userProfile={userProfile}
			hasDivider={true}
			className={toolBar}
			styled={styled}
			userProfileSx={userProfileSx}>
			{children}
		</TopBar>
	);
}

AppBar.defaultProps = defaultProps;
AppBar.propTypes = propTypes;

export default AppBar;
