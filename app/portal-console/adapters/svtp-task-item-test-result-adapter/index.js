import { apiFetcher } from '@lib/api-fetcher';

export const fetchSVTPTaskTestResultFilesAsync = async testResultId => {
	try {
		return await apiFetcher.get(`test-result/${testResultId}/files`)
			.then(response => {
				return response;
			})
			.then(({ data }) => {
				return {
					data,
				};
			})
			.catch(error => {
				// Error handle
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const downloadSVTPTaskTestResultFileAsync = async (accessKey, versionId, fileName) => {
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
		}).catch(error => {
			// Error handle
		});
	} catch (error) {
		throw new Error(error);
	}
};

export const uploadFileAsync = async (file, resolve, reject) => {
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
			})
			.catch(error => {
				reject(file.name);
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTestResultScheduleAsync = async (resultId, { startAt, endAt }) => {
	try {
		return await apiFetcher.patch(`test-result/${resultId}/schedule`, { startAt, endAt })
			.then(response => {
				return response;
			})
			.catch(error => {

			});
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTestResultWaivedOrBlockedAsync = async (resultId, { waivedOrBlocked }) => {
	try {
		return await apiFetcher.patch(`test-result/${resultId}/waivedorblocked`, { waivedOrBlocked })
			.then(response => {
				return response;
			})
			.catch(error => {

			});
	} catch (error) {
		throw new Error(error);
	}
};
