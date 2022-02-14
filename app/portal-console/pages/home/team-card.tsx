import React from 'react';
import { RouteKeyEnums } from '../../routes/route-config';
import Tag from 'hp-swt-react-component/dest/esm/components/tag';
import { Box, Center } from '@chakra-ui/react';
import Planet from '@components/icon/svgs/planet.svg';
import { OutlineLeaderboard, AssignmentOutlined } from '@components/icon';
import LinkTile from './link-tile';

type TeamCardItemType = {
	item: {
		teamName: string;
		planetCode: string;
		description?: string;
		links?: string[];
	};
	onNavigate: () => void;
}

function TeamCard({ item, onNavigate }: TeamCardItemType) {
	const linkMap = {
		SVTP: {
			key: 'tasks',
			text: 'Tasks',
			icon: <OutlineLeaderboard />,
			to: `${RouteKeyEnums.SVTP_MAIN}`,
		},
		report: {
			key: 'report',
			text: 'Report Links',
			icon: <AssignmentOutlined />,
			to: `${RouteKeyEnums.SVTP_MAIN}`,
		},
	};
	const _renderLinkTiles = tileList => {
		return tileList.map((item, index) => {
			const link = linkMap[item];

			return <LinkTile link={link} key={index} index={index} onNavigate={onNavigate}/>;
		});
	};

	return (
		<Box className="team_card">
			<Center className="team_card_title">
				<Box className={`planet planet--${item.planetCode.toLowerCase()}`}><Planet /></Box>
			</Center>
			<Box>
				<Tag className="tag tag--galaxy" text={item.planetCode} size="md"></Tag>
			</Box>
			<Box>
				<strong>{item.teamName}</strong>
			</Box>
			<Box className="note">
				<span>This is some introduction from hardware team...</span>
			</Box>
			<div>
				{ _renderLinkTiles(item.links)}
			</div>
		</Box>
	);
}

export default TeamCard;
