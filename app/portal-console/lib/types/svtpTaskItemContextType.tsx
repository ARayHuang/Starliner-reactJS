import { MetaDataType } from './svtpTaskContextType';
import { API_STATUS } from '../constants/general';
import { Dispatch, SetStateAction } from 'react';

export type TestResultType = {
	id: string;
	item: string;
	information: string;
	vendor: string;
	startAt: string;
	endAt: string;
	resultStatus: string;
	waivedOrBlocked: string;
	category: string;
	leverageFrom: string;
	obsNumbers: string[];
}

export type ItemType = {
	id: string;
	item: string;
	subItem: string;
	information: string;
	category: string;
	startAt: string;
	endAt: string;
	waivedOrBlocked: string;
	leverageFrom: string;
	taskItemTestResults: TestResultType[];
}

export type TaskInfoType = {
	project: string;
	phase: string;
}

export type SVTPTaskItemStoreContextType = {
	task: TaskInfoType | null;
	items: {[key: string]: ItemType} | null;
	taskItems: ItemType[];
	taskItemMap: Record<string, string>;
	taskItemPageMetadata: MetaDataType | Record<any, never>;
	taskItemQueryParameters: { phaseId?: string; queryParams?: Record<string, string> };
	fetchTaskItemsLoadingStatus: API_STATUS,
	updateScheduleLoadingStatus: API_STATUS,
	updateWaivedOrBlockedLoadingStatus: API_STATUS,
	deleteSVTPTaskItemLoadingStatus: API_STATUS,
	addTestItemLoadingStatus: API_STATUS,
	fetchAllTaskItemsLoading: API_STATUS;
	setTaskInfo: Dispatch<SetStateAction<TaskInfoType>>;
	fetchAllTaskItems: (phaseId: string) => void;
	fetchTaskItems: (phaseId: string, queryParams?: { [key: string]: string | number }) => void;
	updateTestItemSchedule: (itemId: string, { startAt, endAt }: { startAt: string, endAt: string }) => void;
	updateTestItemWaivedOrBlocked: (itemId: string, { waivedOrBlocked: string }) => void;
	deleteSVTPTaskItem: (itemId: string) => void;
	addTestItems: (phaseId: string, templateItemIds: string[]) => void;
}
