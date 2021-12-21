import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchUnaddedTemplateItemsAsync } from '../../../adapters/template-item-adapter';
import { SVTPLoadingStoreContext } from '../loading';
export const TemplateItemStoreContext = React.createContext();

const propTypes = {
	children: PropTypes.node,
};

export const TemplateItemStoreProvider = props => {
	const [unaddedTemplateItems, setUnaddedTemplateItems] = useState([]);
	const { children } = props;
	const { setIsLoading } = useContext(SVTPLoadingStoreContext);
	const fetchUnaddedTemplateItems = async phaseId => {
		setIsLoading(true);

		const response = await fetchUnaddedTemplateItemsAsync(phaseId);
		const sorted = response.data.$values.sort((a, b) => (a.item > b.item) ? 1 : ((b.item > a.item) ? -1 : 0));

		sorted.forEach(item => {
			Object.assign(item, { isSelected: false });
		});
		setUnaddedTemplateItems(sorted);
		setIsLoading(false);
	};

	return (
		<TemplateItemStoreContext.Provider value={{
			unaddedTemplateItems,
			setUnaddedTemplateItems,
			fetchUnaddedTemplateItems,
		}}>
			{children}
		</TemplateItemStoreContext.Provider>
	);
};

TemplateItemStoreProvider.propTypes = propTypes;
