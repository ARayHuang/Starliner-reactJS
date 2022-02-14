import { apiFetcher } from '@lib/api-fetcher';
import {
	APIResponseType,
} from '@lib/types/adapterType';

export const fetchSVTPTaskTestResultFilesAsync = async <T, >(testResultId: string): Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get(`test-result/${testResultId}/files`)
			.then(response => {
				return response;
			})
			.then(({ data }) => {
				return {
					data,
				};
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const downloadSVTPTaskTestResultFileAsync = async (accessKey: string, versionId: string, fileName: string) => {
	try {
		return await apiFetcher({
			url: 'test-result/download',
			method: 'GET',
			responseType: 'blob',
			params: {
				accessKey,
				versionId,
				fileName,
			},

		}).then(response => {
			return response;
		});
	} catch (error) {
		throw new Error(error);
	}
};

export const uploadFileAsync = async (file: File, resolve: (response: string[]) => void, reject: (response: string[]) => void) => {
	try {
		const formData = new FormData();

		formData.append('files', file);

		return await apiFetcher.post('test-result', formData)
			.then(response => {
				return response;
			})
			.then(({ data }) => {
				resolve(data);
				return {
					data,
				};
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTestResultScheduleAsync = async (resultId, { startAt, endAt }): Promise<void> => {
	try {
		return await apiFetcher.patch(`test-result/${resultId}/schedule`, { startAt, endAt })
			.then(response => {
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTestResultWaivedOrBlockedAsync = async (resultId, { waivedOrBlocked }): Promise<void> => {
	try {
		return await apiFetcher.patch(`test-result/${resultId}/waivedorblocked`, { waivedOrBlocked })
			.then(response => {

			});
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTestResultObsNumbersAsync = async <T, >(resultId, obsNumbers): Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.patch(`test-result/${resultId}/obs`, obsNumbers)
			.then(response => {
				return response;
			});
	} catch (error) {
		throw new Error(error);
	}
};
