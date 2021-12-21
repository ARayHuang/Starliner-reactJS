import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	fetchSVTPTaskTestResultFilesAsync,
	downloadSVTPTaskTestResultFileAsync,
	updateTestResultScheduleAsync,
	updateTestResultWaivedOrBlockedAsync,
} from '../../../adapters/svtp-task-item-test-result-adapter';
import { format } from 'date-fns';
import fileDownload from 'js-file-download';
import { API_STATUE } from '@lib/constants/general';
export const SVTPTaskItemTestResultStoreContext = React.createContext();

const {
	INITIAL,
	COMPLETED,
	LOADING,
} = API_STATUE;
const propTypes = {
	children: PropTypes.node,
};

export const SVTPTaskItemTestResultStoreProvider = props => {
	const [updateScheduleLoadingStatus, setUpdateScheduleLoadingStatus] = useState(INITIAL);
	const [updateWaivedOrBlockedLoadingStatus, setUpdateWaivedOrBlockedLoadingStatus] = useState(INITIAL);
	const [testResultFiles, setTestResultFiles] = useState([]);
	const { children } = props;
	const fetchTestResultFiles = async testResultId => {
		const response = await fetchSVTPTaskTestResultFilesAsync(testResultId);

		if (response) {
			const { data } = response;
			const parsedData = data.map(fileInfo => {
				fileInfo.uploadAt = format(new Date(fileInfo.uploadAt), 'yyyy-MM-dd HH:mm:ss');
				return fileInfo;
			});

			setTestResultFiles(parsedData);
		}
	};
	const updateTestResultSchedule = async (testResultId, { startAt, endAt }) => {
		const response = await updateTestResultScheduleAsync(testResultId, { startAt, endAt });

		setUpdateScheduleLoadingStatus(LOADING);

		await _handleResponseCompleted(response, () => setUpdateScheduleLoadingStatus(COMPLETED));
	};
	const updateTestResultWaivedOrBlocked = async (testResultId, { waivedOrBlocked }) => {
		const response = await updateTestResultWaivedOrBlockedAsync(testResultId, { waivedOrBlocked });

		setUpdateWaivedOrBlockedLoadingStatus(LOADING);

		await _handleResponseCompleted(response, () => setUpdateWaivedOrBlockedLoadingStatus(COMPLETED));
	};
	const resetTestResultFiles = () => {
		setTestResultFiles([]);
	};
	const downloadTestResultFile = async (accessKey, versionId, fileName) => {
		const response = await downloadSVTPTaskTestResultFileAsync(accessKey, versionId, fileName);

		fileDownload(response.data, fileName);
	};
	const _handleResponseCompleted = (response, setState) => {
		if (response) {
			setState();
		}
	};

	return (
		<SVTPTaskItemTestResultStoreContext.Provider
			value={{
				testResultFiles,
				updateScheduleLoadingStatus,
				updateWaivedOrBlockedLoadingStatus,
				fetchTestResultFiles,
				resetTestResultFiles,
				downloadTestResultFile,
				updateTestResultSchedule,
				updateTestResultWaivedOrBlocked,
			}}
		>
			{children}
		</SVTPTaskItemTestResultStoreContext.Provider>
	);
};

SVTPTaskItemTestResultStoreProvider.propTypes = propTypes;
