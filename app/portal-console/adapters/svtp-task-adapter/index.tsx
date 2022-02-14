import { apiFetcher } from '@lib/api-fetcher';
import {
	APIResponseType,
	QueryParamsType,
} from '@lib/types/adapterType';

export const fetchSVTPTasksAsync = async <T, >(queryParams? : QueryParamsType) : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get('svtp-task', { params: { ...queryParams } })
			.then(response => {
				return response;
			})
			.then(({ headers, data }) => {
				return {
					headers,
					data,
				};
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const fetchSVTPTaskAsync = async <T, >(svtpId : string) : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get(`svtp-task/${svtpId}`)
			.then(response => {
				return response;
			})
			.then(({ headers, data }) => {
				return {
					headers,
					data,
				};
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const createSVTPTaskAsync = async <T, >(body : {[key: string]: string }) : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.post('svtp-task', { ...body })
			.then(response => {
				return {
					data: response.data,
				};
			});
	} catch (error) {
		throw new Error(error);
	}
};
export const updateSVTPTaskAsync = async <T, >(body) : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.patch('svtp-task', { ...body })
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
export const fetchProjectsAsync = async <T, >() : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get('svtp-task/projects')
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
