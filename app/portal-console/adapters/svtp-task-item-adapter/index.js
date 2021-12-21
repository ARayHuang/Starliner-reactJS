import { apiFetcher } from '@lib/api-fetcher';
import { PAGINATION } from '@lib/constants/general';
import { errorNotify } from '@lib/notify-handler/use-notify';

export const fetchSVTPTaskItemsAsync = async (svtpId, queryParams) => {
	try {
		return await apiFetcher.get(`task-phase/${svtpId}/items`, { params: { ...queryParams } })
			.then(response => {
				return response;
			})
			.then(({ headers, data }) => {
				let paginationMetadataString = {};

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

export const fetchAllSVTPTaskItemsAsync = async svtpId => {
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

export const updateSVTPTestItemScheduleAsync = async (itemId, { startAt, endAt }) => {
	try {
		return await apiFetcher.patch(`task-item/${itemId}/schedule`, { startAt, endAt })
			.then(response => {
				return response;
			});
	} catch (error) {
		errorNotify(error);
	}
};

export const updateSVTPTestItemWaivedOrBlockedAsync = async (itemId, { waivedOrBlocked }) => {
	try {
		return await apiFetcher.patch(`task-item/${itemId}/waivedorblocked`, { waivedOrBlocked })
			.then(response => {
				return response;
			});
	} catch (error) {
		errorNotify(error);
	}
};

export const deleteSVTPTaskItemAsync = async itemId => {
	try {
		return await apiFetcher.delete(`task-item/${itemId}`)
			.then(response => {
				return response;
			});
	} catch (error) {
		errorNotify(error);
	}
};

export const addTestItemsAsync = async (phaseId, itemIds) => {
	try {
		return await apiFetcher.post(`svtp-task/${phaseId}/items`, { itemIds })
			.then(response => {
				return response;
			});
	} catch (error) {
		errorNotify(error);
	}
};
