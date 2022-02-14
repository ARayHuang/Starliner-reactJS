import { apiFetcher } from '@lib/api-fetcher';
import {
	APIResponseJsonResultType,
} from '@lib/types/adapterType';

export const fetchUnaddedTemplateItemsAsync = async <T, >(phaseId: string) : Promise<APIResponseJsonResultType<T>> => {
	try {
		return await apiFetcher.get(`template-items/${phaseId}/unaddedTemplateItems`)
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
