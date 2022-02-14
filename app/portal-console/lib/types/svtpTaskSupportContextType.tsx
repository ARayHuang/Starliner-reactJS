import { Dispatch, SetStateAction } from 'react';
import { API_STATUS } from '../constants/general';

export type TaskSupportType = {
	isSelected: boolean;
    featureId: string;
    featureCategory: string;
    feature: string;
    effectedItems: string[];
}

export type SVTPTaskSupportStoreContextType = {
	supportList: TaskSupportType[];
	fetchSupportListLoadingStatus: API_STATUS;
	fetchSupportListByTaskIdLoadingStatus: API_STATUS;
	fetchSupportList: () => void;
	fetchSupportListByTaskId: (taskId: string) => void;
	setSupportList: Dispatch<SetStateAction<TaskSupportType[]>>;
}
