import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

function Root({
	renderedRoutes,
}) {
	return (
		<div className="root">
			{renderedRoutes}
		</div>
	);
}

Root.propTypes = propTypes;

export default Root;
