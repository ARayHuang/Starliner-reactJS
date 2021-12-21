import { apiFetcher } from '@lib/api-fetcher';

export const fetchSVTPTaskSupportAsync = async () => {
	try {
		return await apiFetcher.get('auto-gen/supports')
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
export const fetchSVTPTaskSupportByTaskIdAsync = async taskId => {
	try {
		return await apiFetcher.get(`auto-gen/${taskId}/supports`)
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
