import { Dispatch, SetStateAction } from 'react';
import { API_STATUS } from '../constants/general';

export type UnaddedTemplateItemType = {
	id: string;
	item: string;
	information: string;
	type: string;
	isSelected?: boolean;
}

export type SVTPTaskSupportStoreContextType = {
	unaddedTemplateItems: UnaddedTemplateItemType[];
	fetchUnaddedTemplateItemsLoadingStatus: API_STATUS
	setUnaddedTemplateItems: Dispatch<SetStateAction<UnaddedTemplateItemType[]>>;
	fetchUnaddedTemplateItems: (phaseId: string) => void;
}
