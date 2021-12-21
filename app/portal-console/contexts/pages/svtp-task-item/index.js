import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	fetchSVTPTaskItemsAsync,
	updateSVTPTestItemScheduleAsync,
	updateSVTPTestItemWaivedOrBlockedAsync,
	addTestItemsAsync,
	deleteSVTPTaskItemAsync,
} from '../../../adapters/svtp-task-item-adapter';
import { groupBy } from '@lib/general/utils';
import { API_STATUE } from '@lib/constants/general';
import { handleResponseCompleted } from '../utils';
import { SVTPLoadingStoreContext } from '../loading';
export const SVTPTaskItemStoreContext = React.createContext();

const propTypes = {
	children: PropTypes.node,
};
const {
	INITIAL,
	COMPLETED,
	LOADING,
} = API_STATUE;

export const SVTPTaskItemStoreProvider = props => {
	const [taskItems, setTaskItems] = useState([]);
	const [taskItemMap, setTaskItemMap] = useState({});
	const [taskItemPageMetadata, setTaskItemPageMetadata] = useState({});
	const [updateScheduleLoadingStatus, setUpdateScheduleLoadingStatus] = useState(INITIAL);
	const [updateWaivedOrBlockedLoadingStatus, setUpdateWaivedOrBlockedLoadingStatus] = useState(INITIAL);
	const [deleteSVTPTaskItemLoadingStatus, setDeleteSVTPTaskItemLoadingStatus] = useState(INITIAL);
	const [addTestItemLoadingStatus, setAddTestItemLoadingStatus] = useState(INITIAL);
	const { setIsLoading } = React.useContext(SVTPLoadingStoreContext);
	const { children } = props;
	const fetchTaskItems = async (phaseId, queryParams = {}) => {
		const res = await fetchSVTPTaskItemsAsync(phaseId, queryParams);

		if (res) {
			const { data, paginationMetadataString } = res;
			const taskItems = data;
			const paginationMeta = JSON.parse(paginationMetadataString);
			const RenderedGroupKey = item => item.subItem ? `${item.item}^${item.subItem} - ${item.information}` : item.item;
			const taskItemMap = groupBy(taskItems, RenderedGroupKey, 'taskItemTestResults');

			setTaskItems(taskItems);
			setTaskItemMap(taskItemMap);
			setTaskItemPageMetadata(paginationMeta);
		}
	};
	const updateTestItemSchedule = async (itemId, { startAt, endAt }) => {
		const response = await updateSVTPTestItemScheduleAsync(itemId, { startAt, endAt });

		setUpdateScheduleLoadingStatus(LOADING);

		await handleResponseCompleted(response, () => setUpdateScheduleLoadingStatus(COMPLETED));
	};
	const updateTestItemWaivedOrBlocked = async (itemId, { waivedOrBlocked }) => {
		const response = await updateSVTPTestItemWaivedOrBlockedAsync(itemId, { waivedOrBlocked });

		setUpdateWaivedOrBlockedLoadingStatus(LOADING);

		await handleResponseCompleted(response, () => setUpdateWaivedOrBlockedLoadingStatus(COMPLETED));
	};
	const deleteSVTPTaskItem = async itemId => {
		const response = await deleteSVTPTaskItemAsync(itemId);

		setDeleteSVTPTaskItemLoadingStatus(LOADING);

		await handleResponseCompleted(response, () => setDeleteSVTPTaskItemLoadingStatus(COMPLETED));
	};
	const addTestItems = async (phaseId, templateItemIds) => {
		setAddTestItemLoadingStatus(LOADING);
		setIsLoading(true);

		const response = await addTestItemsAsync(phaseId, templateItemIds);

		setIsLoading(false);

		await handleResponseCompleted(response, () => setAddTestItemLoadingStatus(COMPLETED));
	};

	return (
		<SVTPTaskItemStoreContext.Provider
			value={{
				taskItems,
				taskItemMap,
				taskItemPageMetadata,
				updateScheduleLoadingStatus,
				updateWaivedOrBlockedLoadingStatus,
				deleteSVTPTaskItemLoadingStatus,
				addTestItemLoadingStatus,
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

SVTPTaskItemStoreProvider.propTypes = propTypes;
