import { apiFetcher } from '@lib/api-fetcher';

export const fetchUnaddedTemplateItemsAsync = async phaseId => {
	try {
		return await apiFetcher.get(`template-items/${phaseId}/unaddedTemplateItems`)
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
