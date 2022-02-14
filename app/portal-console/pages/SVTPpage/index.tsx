import React from 'react';
import { RouteKeyEnums } from '../../routes/route-config';
import { VStack, Flex, Box } from '@chakra-ui/react';
import ListItem from 'hp-swt-react-component/dest/esm/components/list/list-item';
import { AssignmentOutlined } from '@components/icon';
import PropTypes from 'prop-types';

const tabItem = [
	{
		key: 'main',
		text: 'Tasks',
		to: `${RouteKeyEnums.SVTP_MAIN}/dashboard`,
	},
	{
		key: 'download',
		text: 'Download Template',
		to: RouteKeyEnums.SVTP_DOWNLOAD,
	},
	{
		key: 'settings',
		text: 'Settings',
		to: RouteKeyEnums.SVTP_SETTINGS,
	},
];
const propTypes = {
	renderedRoutes: PropTypes.object,
	onNavigate: PropTypes.func,
	pathName: PropTypes.string,
	selectedClassName: PropTypes.string,
};
const defaultProps = {
	onNavigate: () => {},
};

function SVTP({ renderedRoutes, onNavigate, pathName, selectedClassName }) {
	return (
		<div>
			<VStack className="content_tab svtp_menu">
				<Flex>
					<Box>
						<Box className="tab_title">
							<AssignmentOutlined size={{ h: 6, w: 6 }} />
							<label>SVTP</label>
							<Box
								py="10px"
								fontSize="9px">Manage and review SVTP test progress</Box>
						</Box>
						{ tabItem.map(item => {
							return <ListItem className="tab_item"
								selectedClassName="tab_item--selected"
								isSelected={pathName === item.to}
								key={item.key}
								isButton={true}
								onClick={() => onNavigate(item.to)}>
								<span>{item.text}</span>
							</ListItem>;
						})}
					</Box>
				</Flex>
			</VStack>
			<div className="content_wrap">
				{renderedRoutes}
			</div>
		</div>
	);
}

SVTP.propTypes = propTypes;
SVTP.defaultProps = defaultProps;

export default SVTP;
