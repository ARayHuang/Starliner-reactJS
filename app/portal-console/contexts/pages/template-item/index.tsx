import React, { useState, useContext } from 'react';
import { fetchUnaddedTemplateItemsAsync } from '../../../adapters/template-item-adapter';
import { SVTPLoadingStoreContext } from '../loading';
import { SVTPTaskSupportStoreContextType, UnaddedTemplateItemType } from '@lib/types/templateItemContextType';
import { API_STATUS } from '@lib/constants/general';
import { useAPIFetcherJsonResult } from '../utils';

const {
	INITIAL,
} = API_STATUS;

export const TemplateItemStoreContext = React.createContext<SVTPTaskSupportStoreContextType>({
	unaddedTemplateItems: [],
	fetchUnaddedTemplateItemsLoadingStatus: INITIAL,
	setUnaddedTemplateItems: () => {},
	fetchUnaddedTemplateItems: () => {},
});

export const TemplateItemStoreProvider = ({ key, children }: {key: string, children?: React.ReactNode}) => {
	const [unaddedTemplateItems, setUnaddedTemplateItems] = useState<UnaddedTemplateItemType[]>([]);
	const [fetchUnaddedTemplateItemsLoadingStatus, wrappedFetchUnaddedTemplateItems] = useAPIFetcherJsonResult<UnaddedTemplateItemType>();
	const { setIsLoading } = useContext(SVTPLoadingStoreContext);
	const fetchUnaddedTemplateItems = async phaseId => {
		setIsLoading(true);

		const [isAPISuccess, response] = await wrappedFetchUnaddedTemplateItems(() => fetchUnaddedTemplateItemsAsync<UnaddedTemplateItemType>(phaseId));

		if (isAPISuccess) {
			const sorted = response.data.$values.sort((a, b) => (a.item > b.item) ? 1 : ((b.item > a.item) ? -1 : 0));

			sorted.forEach(item => {
				Object.assign(item, { isSelected: false });
			});
			setUnaddedTemplateItems(sorted);
		}

		setIsLoading(false);
	};

	return (
		<TemplateItemStoreContext.Provider value={{
			unaddedTemplateItems,
			fetchUnaddedTemplateItemsLoadingStatus,
			setUnaddedTemplateItems,
			fetchUnaddedTemplateItems,
		}}>
			{children}
		</TemplateItemStoreContext.Provider>
	);
};
