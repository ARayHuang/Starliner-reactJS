import { API_STATUS } from '@lib/constants/general';
import { APIResponseType, APIResponseJsonResultType } from '@lib/types/adapterType';
import { useEffect, useState } from 'react';

const {
	INITIAL,
	LOADING,
	ERROR,
	COMPLETED,
} = API_STATUS;

export const useAPIFetcher = <T, >(dependency?: any[]) :
[
	loadingStatus: API_STATUS,
	wrappedAPI: (apiFetcherAsync) => Promise<[isAPISuccess : boolean, res: APIResponseType<T>]>
] => {
	const [loadingStatus, setLoadingStatus] = useState(INITIAL);
	const wrappedAPI = async (apiFetcherAsync) : Promise<[isAPISuccess : boolean, res: APIResponseType<T>]> => {
		setLoadingStatus(LOADING);

		const res = await apiFetcherAsync();

		if (res) {
			if (dependency === undefined) {
				setLoadingStatus(COMPLETED);
			}

			return [true, res];
		}

		if (!res) {
			setLoadingStatus(ERROR);
			return [false, res];
		}
	};

	useEffect(() => {
		if (dependency !== undefined) {
			setLoadingStatus(COMPLETED);
		}
	}, dependency);

	return [loadingStatus, wrappedAPI];
};

export const useAPIFetcherJsonResult = <T, >(dependency?: any[]) :
[
	loadingStatus: API_STATUS,
	wrappedAPI: (apiFetcherAsync) => Promise<[isAPISuccess : boolean, res: APIResponseJsonResultType<T>]>
] => {
	const [loadingStatus, setLoadingStatus] = useState(INITIAL);
	const wrappedAPI = async (apiFetcherAsync) : Promise<[isAPISuccess : boolean, res: APIResponseJsonResultType<T>]> => {
		setLoadingStatus(LOADING);

		const res = await apiFetcherAsync();

		if (res) {
			if (dependency === undefined) {
				setLoadingStatus(COMPLETED);
			}

			return [true, res];
		}

		setLoadingStatus(ERROR);
		return [false, res];
	};

	useEffect(() => {
		if (dependency !== undefined) {
			setLoadingStatus(COMPLETED);
		}
	}, dependency);

	return [loadingStatus, wrappedAPI];
};
