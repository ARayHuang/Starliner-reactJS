import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

function SVTPMain({
	renderedRoutes,
}) {
	return (
		<div className="svtp-main">
			{renderedRoutes}
		</div>
	);
}

SVTPMain.propTypes = propTypes;

export default SVTPMain;
