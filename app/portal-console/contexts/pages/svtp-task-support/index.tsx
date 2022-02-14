import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchSVTPTaskSupportAsync as fetchSVTPTaskSupportListAsync, fetchSVTPTaskSupportByTaskIdAsync as fetchSVTPTaskSupportListByTaskIdAsync } from '../../../adapters/svtp-task-support-adapter';
import { API_STATUS, ENUM_CATEGORY } from '@lib/constants/general';
import { useAPIFetcher } from '../utils';
import { SVTPLoadingStoreContext } from '../loading';
import { SVTPTaskSupportStoreContextType, TaskSupportType } from '@lib/types/svtpTaskSupportContextType';

const {
	INITIAL,
} = API_STATUS;
const propTypes = {
	children: PropTypes.node,
};
const compareCategory = (first, second) => {
	return Object.values(ENUM_CATEGORY).indexOf(first.featureCategory) - Object.values(ENUM_CATEGORY).indexOf(second.featureCategory);
};

export const SVTPTaskSupportStoreContext = React.createContext<SVTPTaskSupportStoreContextType>({
	supportList: [],
	fetchSupportListLoadingStatus: INITIAL,
	fetchSupportListByTaskIdLoadingStatus: INITIAL,
	fetchSupportList: () => {},
	fetchSupportListByTaskId: () => {},
	setSupportList: () => {},
});

export const SVTPTaskSupportStoreProvider = ({ key, children }: {key: string, children?: React.ReactNode}) => {
	const [supportList, setSupportList] = useState<TaskSupportType[]>([]);
	const [fetchSupportListLoadingStatus, wrappedFetchSupportList] = useAPIFetcher<TaskSupportType[]>();
	const [fetchSupportListByTaskIdLoadingStatus, wrappedFetchSupportListByTaskId] = useAPIFetcher<TaskSupportType[]>();
	const { setIsLoading } = useContext(SVTPLoadingStoreContext);
	const fetchSupportList = async () => {
		setIsLoading(true);

		const [isAPISuccess, response] = await wrappedFetchSupportList(() => fetchSVTPTaskSupportListAsync<TaskSupportType[]>());

		if (isAPISuccess) {
			const { data } = response;

			setSupportList(data.sort(compareCategory));
		}

		setIsLoading(false);
	};
	const fetchSupportListByTaskId = async taskId => {
		setIsLoading(true);

		const [isAPISuccess, response] = await wrappedFetchSupportListByTaskId(() => fetchSVTPTaskSupportListByTaskIdAsync<TaskSupportType[]>(taskId));

		if (isAPISuccess) {
			const { data } = response;

			setSupportList(data.sort(compareCategory));
		}

		setIsLoading(false);
	};

	return (
		<SVTPTaskSupportStoreContext.Provider
			value={{
				fetchSupportList,
				fetchSupportListByTaskId,
				setSupportList,
				fetchSupportListLoadingStatus,
				fetchSupportListByTaskIdLoadingStatus,
				supportList,
			}}
		>
			{children}
		</SVTPTaskSupportStoreContext.Provider>
	);
};

SVTPTaskSupportStoreProvider.propTypes = propTypes;

