import React from 'react';
import PropTypes from 'prop-types';
import { Center } from '@chakra-ui/react';

const propTypes = {
	children: PropTypes.node,
};

function ModalFooter({ children }) {
	return <Center w="full" py={6}>
		{children}
	</Center>;
}

ModalFooter.propTypes = propTypes;

export default ModalFooter;
