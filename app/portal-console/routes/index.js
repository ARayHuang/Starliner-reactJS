import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './route-config';
import UseStylesSideBar from './use-style';
import { Link } from 'react-router-dom';
import AppBar from '@components/app-bar';
import AppFooter from '@components/app-footer';
import Rocket from '@components/icon/svgs/rocket.svg';
import {
	AssignmentOutlined,
	RemoveRedEyeOutlined,
	BarChartOutlined,
	LinkOutlined } from '@material-ui/icons';
import { renderSwitcher } from './render-switcher';
import { RouteKeyEnums } from './route-config';
import { Flex, Box } from '@chakra-ui/react';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@chakra-ui/react';

const {
	SVTP_MAIN,
} = RouteKeyEnums;
const sidebarMenu = [
	{
		key: 'SVTP',
		text: 'SVTP',
		to: SVTP_MAIN,
		icon: AssignmentOutlined,
	},
	{
		key: 'menu2',
		text: 'Insight Lab',
		to: '/insight-lab',
		icon: RemoveRedEyeOutlined,
	},
	{
		key: 'menu3',
		text: 'Reports',
		to: '/reports',
		icon: BarChartOutlined,
	},
	{
		key: 'menu4',
		text: 'Other Links',
		to: '/other',
		icon: LinkOutlined,
	},
];
const useStyleForLink = makeStyles(theme => ({
	link: {
		textDecoration: 'none',
		color: '#EEE',
		paddingLeft: '28px',
		'& .icon': {
			marginRight: '10px',
		},
		overflow: 'hidden',
		whiteSpace: 'nowrap',
	},
}));

function AppRouter() {
	const [selectedKey, setSelectKey] = useState('');
	const root = UseStylesSideBar();
	const { link } = useStyleForLink();

	function _handleListItemChangSelected(key) {
		setSelectKey(key);
	}

	function _renderListItems() {
		return sidebarMenu.map(item => {
			return (
				<Box key={item.key} className="link_item">
					<Link className={`${link} link`} to={item.to} key={item.key}>
						{ item.icon ? <Icon className="icon" as={item.icon} /> : null}
						<span>{item.text}</span>
					</Link>
				</Box>
			);
		});
	}

	function _renderTitle() {
		return (
			<div className="drawer_wrapper">
				<Box py={10} className = "drawer">
					<Rocket className={`logo rocket ${root.rocket}`} />
					<span className="name">
					Starliner
					</span>
					<span className="version">
					1.0.0
					</span>
				</Box>
				{_renderListItems()}
			</div>);
	}

	return (<div>
		<Router basename="/portal">
			<Flex height="100vh" overflow="hidden">
				{_renderTitle()}
				<div className="main_content">
					<AppBar className="main_content" classes={root}>
					</AppBar>
					<div style={{ overflow: 'auto', minHeight: '100vh' }}>
						{renderSwitcher(routes)}
					</div>
					<AppFooter />
				</div>
			</Flex>
		</Router>
	</div>
	);
}

export default AppRouter;
