import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { fetchSVTPTaskSupportAsync as fetchSVTPTaskSupportListAsync, fetchSVTPTaskSupportByTaskIdAsync as fetchSVTPTaskSupportListByTaskIdAsync } from '../../../adapters/svtp-task-support-adapter';
import { API_STATUE, ENUM_CATEGORY } from '@lib/constants/general';
import { useAPIResponse } from '../utils';
import { SVTPLoadingStoreContext } from '../loading';
export const SVTPTaskSupportStoreContext = React.createContext();

const {
	INITIAL,
	COMPLETED,
	LOADING,
} = API_STATUE;
const propTypes = {
	children: PropTypes.node,
};
const compareCategory = (first, second) => {
	return Object.values(ENUM_CATEGORY).indexOf(first.featureCategory) - Object.values(ENUM_CATEGORY).indexOf(second.featureCategory);
};

export const SVTPTaskSupportStoreProvider = props => {
	const { children } = props;
	const [supportList, setSupportList] = useState([]);
	const [supportListLoadingStatus, setSupportListLoadingStatus] = useState(INITIAL);
	const { setIsLoading } = useContext(SVTPLoadingStoreContext);
	const fetchSupportList = async () => {
		setSupportListLoadingStatus(LOADING);
		setIsLoading(true);

		const response = await fetchSVTPTaskSupportListAsync();
		const { isAPISuccess } = useAPIResponse(response, status => setSupportListLoadingStatus(status));

		if (isAPISuccess) {
			const { data } = response;

			setSupportList(data.sort(compareCategory));
		}

		setIsLoading(false);
	};
	const fetchSupportListByTaskId = async taskId => {
		setSupportListLoadingStatus(LOADING);
		setIsLoading(true);

		const response = await fetchSVTPTaskSupportListByTaskIdAsync(taskId);
		const { isAPISuccess } = useAPIResponse(response, status => setSupportListLoadingStatus(status));

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
				supportListLoadingStatus,
				supportList,
			}}
		>
			{children}
		</SVTPTaskSupportStoreContext.Provider>
	);
};

SVTPTaskSupportStoreProvider.propTypes = propTypes;

