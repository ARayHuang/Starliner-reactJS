import { apiFetcher } from '@lib/api-fetcher';
import {
	APIResponseType,
} from '@lib/types/adapterType';

export const fetchSVTPTaskSupportAsync = async <T, >() : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get('auto-gen/supports')
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

export const fetchSVTPTaskSupportByTaskIdAsync = async <T, >(taskId: string) : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get(`auto-gen/${taskId}/supports`)
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
