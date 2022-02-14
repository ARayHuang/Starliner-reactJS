import React from 'react';
import { Box } from '@chakra-ui/react';
import HpLogo from '../icon/svgs/logo.svg';

function AppFooter() {
	return (
		<Box
			className="app-footer"
			w="100%"
			textAlign="right"
			p={4}>
			<Box display="inline-block"
				verticalAlign="middle"
				px={2}>
				<HpLogo />
			</Box>
		</Box>
	);
}

export default AppFooter;
