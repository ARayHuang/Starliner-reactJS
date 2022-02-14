import React, { useState } from 'react';
import {
	fetchSVTPTaskTestResultFilesAsync,
	downloadSVTPTaskTestResultFileAsync,
	updateTestResultScheduleAsync,
	updateTestResultWaivedOrBlockedAsync,
	updateTestResultObsNumbersAsync,
} from '../../../adapters/svtp-task-item-test-result-adapter';
import { format } from 'date-fns';
import fileDownload from 'js-file-download';
import { API_STATUS } from '@lib/constants/general';
import { SVTPTaskItemStoreContextType, TestResultFileType } from '@lib/types/svtpTaskItemTestResultContextType';
import { useAPIFetcher } from '../utils';

const {
	INITIAL,
} = API_STATUS;

export const SVTPTaskItemTestResultStoreContext = React.createContext<SVTPTaskItemStoreContextType>({
	testResultFiles: [],
	fetchTestResultFilesLoadingStatus: INITIAL,
	updateScheduleLoadingStatus: INITIAL,
	updateWaivedOrBlockedLoadingStatus: INITIAL,
	updateTestResultObsNumbersStatus: INITIAL,
	fetchTestResultFiles: () => { },
	resetTestResultFiles: () => { },
	downloadTestResultFile: () => { },
	updateTestResultSchedule: () => { },
	updateTestResultWaivedOrBlocked: () => { },
	updateTestResultObsNumbers: () => { },
});

export const SVTPTaskItemTestResultStoreProvider = ({ key, children }: { key: string, children?: React.ReactNode }) => {
	const [testResultFiles, setTestResultFiles] = useState<TestResultFileType[]>([]);
	const [fetchTestResultFilesLoadingStatus, wrappedFetchTestResultFiles] = useAPIFetcher<TestResultFileType[]>();
	const [updateScheduleLoadingStatus, wrappedUpdateSchedule] = useAPIFetcher();
	const [updateWaivedOrBlockedLoadingStatus, wrappedUpdateWaivedOrBlocked] = useAPIFetcher();
	const [updateTestResultObsNumbersStatus, wrapUpdateTestResultObsNumbers] = useAPIFetcher();
	const fetchTestResultFiles = async testResultId => {
		const [isAPISuccess, response] = await wrappedFetchTestResultFiles(() => fetchSVTPTaskTestResultFilesAsync<TestResultFileType[]>(testResultId));

		if (isAPISuccess) {
			const { data } = response;
			const parsedData = data.map(fileInfo => {
				fileInfo.uploadAt = format(new Date(fileInfo.uploadAt), 'yyyy-MM-dd HH:mm:ss');
				return fileInfo;
			});

			setTestResultFiles(parsedData);
		}
	};
	const updateTestResultSchedule = async (testResultId, { startAt, endAt }) => {
		wrappedUpdateSchedule(() => updateTestResultScheduleAsync(testResultId, { startAt, endAt }));
	};
	const updateTestResultWaivedOrBlocked = async (testResultId, { waivedOrBlocked }) => {
		wrappedUpdateWaivedOrBlocked(() => updateTestResultWaivedOrBlockedAsync(testResultId, { waivedOrBlocked }));
	};
	const resetTestResultFiles = () => {
		setTestResultFiles([]);
	};
	const downloadTestResultFile = async (accessKey, versionId, fileName) => {
		const response = await downloadSVTPTaskTestResultFileAsync(accessKey, versionId, fileName);

		fileDownload(response.data, fileName);
	};
	const updateTestResultObsNumbers = async (testResultId, obsNumbers) => {
		wrapUpdateTestResultObsNumbers(() => updateTestResultObsNumbersAsync(testResultId, obsNumbers));
	};

	return (
		<SVTPTaskItemTestResultStoreContext.Provider
			value={{
				testResultFiles,
				fetchTestResultFilesLoadingStatus,
				updateScheduleLoadingStatus,
				updateWaivedOrBlockedLoadingStatus,
				updateTestResultObsNumbersStatus,
				fetchTestResultFiles,
				resetTestResultFiles,
				downloadTestResultFile,
				updateTestResultSchedule,
				updateTestResultWaivedOrBlocked,
				updateTestResultObsNumbers,
			}}
		>
			{children}
		</SVTPTaskItemTestResultStoreContext.Provider>
	);
};
