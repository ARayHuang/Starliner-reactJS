import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.node,
};

function ModalHeader({ children }) {
	return <div className="modal_title">
		{children}
	</div>;
}

ModalHeader.propTypes = propTypes;

export default ModalHeader;
