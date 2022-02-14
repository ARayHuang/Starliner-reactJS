import React from 'react';
import { Box, Tooltip } from '@chakra-ui/react';

type LinkTileType = {
	link: {
		text: string;
		to: string;
		key: string|number;
		icon?: React.ComponentType;
	};
	index: string;
	onNavigate: (to: string) => void;
}

function LinkTile({ link, index, onNavigate }: LinkTileType) {
	return (
		<Tooltip
			label={link.text}
			key={link.key}
			borderRadius="4px">
			<Box className={`link_tiles text--white link_tile--${(index + 1)}`}
				onClick={() => onNavigate(link.to)}
			>
				<Box>{link.icon}</Box>
				<Box className="text">{link.text}</Box>
			</Box>
		</Tooltip>
	);
}

export default LinkTile;
