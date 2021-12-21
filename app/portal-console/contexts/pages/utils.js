import { API_STATUE } from '@lib/constants/general';

export const handleResponseCompleted = (response, setState) => {
	if (response) {
		setState();
	}
};

export const useAPIResponse = (
	response,
	setState,
) => {
	let isAPISuccess = false;

	if (response) {
		isAPISuccess = true;
		setState(API_STATUE.COMPLETED);
	} else {
		isAPISuccess = false;
		setState(API_STATUE.ERROR);
	}

	return { isAPISuccess };
};
