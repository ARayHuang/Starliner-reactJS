import axios from 'axios';
import config from '../../config';
import { errorNotify } from '../notify-handler/use-notify';

const apiFetcher = axios.create({
	baseURL: getSVTPApiBaseUrl(),
	timeout: 30000,
});

apiFetcher.interceptors.response.use(
	res => res,
	err => {
		errorNotify(err);
	},
);

export {
	apiFetcher,
};

export function getSVTPApiBaseUrl() {
	return config.SVTP_BASE_API_URL;
}
