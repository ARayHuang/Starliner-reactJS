import React, { useState } from 'react';
import PropTypes from 'prop-types';
export const SVTPLoadingStoreContext = React.createContext();

const propTypes = {
	children: PropTypes.node,
};

export const SVTPLoadingStoreProvider = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { children } = props;

	return (
		<SVTPLoadingStoreContext.Provider
			value={{
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</SVTPLoadingStoreContext.Provider>
	);
};

SVTPLoadingStoreProvider.propTypes = propTypes;
