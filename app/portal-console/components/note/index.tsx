import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from '@chakra-ui/react';
import { AnnouncementOutlined,
	ClearOutlined,
	CheckOutlined } from '.././icon';

const TypeEnum = {
	INFO: 'info',
	WARNING: 'warning',
	ERROR: 'error',
	SUCCESS: 'success',
};
const typeStyleMap = {
	info: {
		color: 'indigo',
		icon: <Box
			w={4}
			h={4}
			textAlign="center">i</Box>,
	},
	warning: {
		color: 'amber',
		icon: <AnnouncementOutlined size={{ h: 4, w: 4 }}/>,
	},
	error: {
		color: 'orangeRed',
		icon: <ClearOutlined size={{ h: 4, w: 4 }}/>,
	},
	success: {
		color: 'blueGreen',
		icon: <CheckOutlined size={{ h: 4, w: 4 }}/>,
	},
};
const defaultProps = {
	type: 'info',
};

function Note({ text, type, icon }: {text: string; type: string; icon?: React.ReactNode}) {
	return (
		<>
			<Box
				px={4}
				py={2}
				className={'note background--' + typeStyleMap[type].color + '--light'}>
				<Box className={'background--' + typeStyleMap[type].color}
					w={6}
					h={6}
					px="4px"
					py="2px"
					borderRadius="50%"
					display="inline-block">{typeStyleMap[type].icon || icon}</Box>
				<Text
					display="inline-block"
					color="gray.500">
					{text}
				</Text>
			</Box>
		</>);
}

Note.TypeEnum = TypeEnum;
Note.defaultProps = defaultProps;

export default Note;
