import React, { useState } from 'react';
import {
	fetchSVTPTaskItemsAsync,
	updateSVTPTestItemScheduleAsync,
	updateSVTPTestItemWaivedOrBlockedAsync,
	addTestItemsAsync,
	deleteSVTPTaskItemAsync,
} from '@adapters/svtp-task-item-adapter';
import { groupBy } from '@lib/general/utils';
import { API_STATUS } from '@lib/constants/general';
import { SVTPLoadingStoreContext } from '../loading';
import { SVTPTaskItemStoreContextType, ItemType, TaskInfoType } from '@lib/types/svtpTaskItemContextType';
import { MetaDataType } from '@lib/types/svtpTaskContextType';
import { useAPIFetcher } from '../utils';
import { fetchAllSVTPTaskItemsAsync } from '@adapters/svtp-task-item-adapter';

const {
	INITIAL,
} = API_STATUS;

export const SVTPTaskItemStoreContext = React.createContext<SVTPTaskItemStoreContextType>({
	task: null,
	items: {},
	taskItems: [],
	taskItemMap: {},
	taskItemPageMetadata: {},
	taskItemQueryParameters: {},
	fetchTaskItemsLoadingStatus: INITIAL,
	updateScheduleLoadingStatus: INITIAL,
	updateWaivedOrBlockedLoadingStatus: INITIAL,
	deleteSVTPTaskItemLoadingStatus: INITIAL,
	addTestItemLoadingStatus: INITIAL,
	fetchAllTaskItemsLoading: INITIAL,
	setTaskInfo: () => {},
	fetchTaskItems: () => {},
	fetchAllTaskItems: () => {},
	updateTestItemSchedule: () => {},
	updateTestItemWaivedOrBlocked: () => {},
	deleteSVTPTaskItem: () => {},
	addTestItems: () => {},
});

const defaultTask = {
	project: '',
	phase: '',
};

export const SVTPTaskItemStoreProvider = ({ key, children }: {key: string, children?: React.ReactNode}) => {
	const [taskItems, setTaskItems] = useState<ItemType[]>([]);
	const [taskItemMap, setTaskItemMap] = useState<Record<string, string>>({});
	const [taskItemPageMetadata, setTaskItemPageMetadata] = useState<MetaDataType | Record<any, never>>({});
	const [taskItemQueryParameters, setTaskItemQueryParameters] = useState<Record<string, string>>({});
	const [fetchTaskItemsLoadingStatus, wrappedFetchTaskItems] = useAPIFetcher<ItemType[]>();
	const [updateScheduleLoadingStatus, wrappedUpdateSchedule] = useAPIFetcher();
	const [updateWaivedOrBlockedLoadingStatus, wrappedUpdateWaivedOrBlocked] = useAPIFetcher();
	const [deleteSVTPTaskItemLoadingStatus, wrappedDeleteSVTPTaskItem] = useAPIFetcher();
	const [addTestItemLoadingStatus, wrappedAddTestItem] = useAPIFetcher();
	const [fetchAllTaskItemsLoading, wrappedFetchAllTaskItems] = useAPIFetcher<ItemType>();
	const [items, setItems] = useState<{[key: string]: ItemType}>({});
	const [task, setTask] = useState<TaskInfoType>(defaultTask);
	const { setIsLoading } = React.useContext(SVTPLoadingStoreContext);
	const fetchTaskItems = async (phaseId, queryParams = {}) => {
		const [isAPISuccess, res] = await wrappedFetchTaskItems(() => fetchSVTPTaskItemsAsync<ItemType[]>(phaseId, queryParams));

		if (isAPISuccess) {
			const { data, paginationMetadataString } = res;
			const taskItems = data;
			const paginationMeta = JSON.parse(paginationMetadataString);
			const RenderedGroupKey = item => item.subItem ? `${item.item}^${item.subItem} - ${item.information}` : item.item;
			const taskItemMap = groupBy(taskItems, RenderedGroupKey, 'taskItemTestResults');

			taskItems.forEach(item => {
				item.item = item.subItem ? `${item.item}-${item.subItem}` : item.item;
			});
			setTaskItems(taskItems);
			setTaskItemMap(taskItemMap);
			setTaskItemPageMetadata(paginationMeta);
			setTaskItemQueryParameters(Object.assign({
				phaseId,
				queryParams,
			}));
		}
	};
	const updateTestItemSchedule = async (itemId, { startAt, endAt }) => {
		wrappedUpdateSchedule(() => updateSVTPTestItemScheduleAsync(itemId, { startAt, endAt }));
	};
	const updateTestItemWaivedOrBlocked = async (itemId, { waivedOrBlocked }) => {
		wrappedUpdateWaivedOrBlocked(() => updateSVTPTestItemWaivedOrBlockedAsync(itemId, { waivedOrBlocked }));
	};
	const deleteSVTPTaskItem = async itemId => {
		wrappedDeleteSVTPTaskItem(() => deleteSVTPTaskItemAsync(itemId));
	};
	const addTestItems = async (phaseId, templateItemIds) => {
		setIsLoading(true);

		const [isAPISuccess] = await wrappedAddTestItem(() => addTestItemsAsync(phaseId, templateItemIds));

		if (isAPISuccess) {
			setIsLoading(false);
		}
	};
	const setTaskInfo = task => {
		setTask(task);
	};
	const fetchAllTaskItems = async (phaseId: string) => {
		const [isAPISuccess, res] = await wrappedFetchAllTaskItems(() => fetchAllSVTPTaskItemsAsync<ItemType>(phaseId));

		if (isAPISuccess) {
			const { data } = res;
			const taskItems = data;
			const taskItemMap = groupBy(taskItems, item => item.subItem ? `${item.item}^${item.subItem}` : item.item);

			setItems(taskItemMap);
		}
	};

	return (
		<SVTPTaskItemStoreContext.Provider
			value={{
				task,
				items,
				taskItems,
				taskItemMap,
				taskItemPageMetadata,
				taskItemQueryParameters,
				fetchTaskItemsLoadingStatus,
				updateScheduleLoadingStatus,
				updateWaivedOrBlockedLoadingStatus,
				deleteSVTPTaskItemLoadingStatus,
				addTestItemLoadingStatus,
				fetchAllTaskItemsLoading,
				setTaskInfo,
				fetchAllTaskItems,
				fetchTaskItems,
				updateTestItemSchedule,
				updateTestItemWaivedOrBlocked,
				deleteSVTPTaskItem,
				addTestItems,
			}}
		>
			{children}
		</SVTPTaskItemStoreContext.Provider>
	);
};
