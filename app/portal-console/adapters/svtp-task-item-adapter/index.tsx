import { apiFetcher } from '@lib/api-fetcher';
import { PAGINATION } from '@lib/constants/general';
import { errorNotify } from '@lib/notify-handler/use-notify';
import {
	APIResponseType,
	APIResponseVoidType,
	QueryParamsType,
} from '@lib/types/adapterType';

type TaskItemQueryParamsType = {
	category?: string
}

export const fetchSVTPTaskItemsAsync = async <T, >(svtpId: string, queryParams? : QueryParamsType & TaskItemQueryParamsType)
	: Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get(`task-phase/${svtpId}/items`, { params: { ...queryParams } })
			.then(response => {
				return response;
			})
			.then(({ headers, data }) => {
				let paginationMetadataString = '';

				if (headers) {
					paginationMetadataString = headers[PAGINATION];
				}

				return {
					headers,
					data,
					paginationMetadataString,
				};
			});
	} catch (error) {
		errorNotify(error);
	}
};

export const fetchAllSVTPTaskItemsAsync = async <T, >(svtpId: string) : Promise<APIResponseType<T>> => {
	try {
		return await apiFetcher.get(`task-phase/${svtpId}/all-items`)
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
		errorNotify(error);
	}
};

export const updateSVTPTestItemScheduleAsync = async (
	itemId: string,
	{ startAt, endAt }: { startAt: string; endAt: string },
) : Promise<APIResponseVoidType> => {
	try {
		return await apiFetcher.patch(`task-item/${itemId}/schedule`, { startAt, endAt })
			.then(response => response);
	} catch (error) {
		errorNotify(error);
	}
};

export const updateSVTPTestItemWaivedOrBlockedAsync = async (
	itemId: string,
	{ waivedOrBlocked } : { waivedOrBlocked: string},
) : Promise<APIResponseVoidType> => {
	try {
		return await apiFetcher.patch(`task-item/${itemId}/waivedorblocked`, { waivedOrBlocked })
			.then(response => response);
	} catch (error) {
		errorNotify(error);
	}
};

export const deleteSVTPTaskItemAsync = async (itemId: string) : Promise<APIResponseVoidType> => {
	try {
		return await apiFetcher.delete(`task-item/${itemId}`)
			.then(response => response);
	} catch (error) {
		errorNotify(error);
	}
};

export const addTestItemsAsync = async (phaseId: string, itemIds: string) : Promise<APIResponseVoidType> => {
	try {
		return await apiFetcher.post(`svtp-task/${phaseId}/items`, { itemIds })
			.then(response => response);
	} catch (error) {
		errorNotify(error);
	}
};
