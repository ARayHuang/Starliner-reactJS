import { apiFetcher } from '@lib/api-fetcher';

export const fetchSVTPTasksAsync = async queryParams => {
	try {
		return await apiFetcher.get('svtp-task', { ...queryParams })
			.then(response => {
				return response;
			})
			.then(({ headers, data }) => {
				return {
					headers,
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

export const fetchSVTPTaskAsync = async svtpId => {
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
			})
			.catch(error => {
				// Error handle
			});
	} catch (error) {
		throw new Error(error);
	}
};

export const createSVTPTaskAsync = async body => {
	try {
		return await apiFetcher.post('svtp-task', { ...body })
			.then(response => {
				return response;
			})
			.catch(error => {
				// Error handle
			});
	} catch (error) {
		throw new Error(error);
	}
};
export const updateSVTPTaskAsync = async body => {
	try {
		return await apiFetcher.patch('svtp-task', { ...body })
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
export const fetchProjectsAsync = async () => {
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
