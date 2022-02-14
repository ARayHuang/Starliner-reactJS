import { apiFetcher } from '@lib/api-fetcher';

export const loginSAMLAsync = async () => {
	try {
		return await apiFetcher.get('https://starlinerapp.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=7cjjqk3tdtpavb0fdm4j6aipvh&redirect_uri=http://localhost:3003/portal/home')
			.then(response => {
				console.log(response);
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
