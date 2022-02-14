import { API_STATUS } from '../constants/general';

export type TestResultFileType = {
	id: string;
	fileName: string;
	uploadAt: string;
	s3FileAccessKey: string;
	versionId: string;
}

export type SVTPTaskItemStoreContextType = {
	testResultFiles: TestResultFileType[];
	fetchTestResultFilesLoadingStatus: API_STATUS
	updateScheduleLoadingStatus: API_STATUS;
	updateWaivedOrBlockedLoadingStatus: API_STATUS;
	updateTestResultObsNumbersStatus: API_STATUS;
	fetchTestResultFiles: (testResultId: string) => void;
	resetTestResultFiles: () => void;
	downloadTestResultFile: (accessKey: string, versionId: string, fileName: string) => void;
	updateTestResultSchedule: (itemId: string, { startAt, endAt }: { startAt: string, endAt: string }) => void;
	updateTestResultWaivedOrBlocked: (itemId: string, { waivedOrBlocked: string }) => void;
	updateTestResultObsNumbers: (testResultId: string, obsNumbers: string[]) => void;
}
