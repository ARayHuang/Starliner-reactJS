export const PAGINATION = 'x-pagination';

export enum PHASE_ENUM {
	DB = 'DB',
	SI = 'SI',
	PV = 'PV',
}

export enum UPLOAD_RESULT {
	ERROR = 'ERROR',
	COMPLETE = 'COMPLETE',
	WARNING = 'WARNING',
	LOADING = 'LOADING',
	PRE_CHECK_SUCCESS = 'pre-check-success',
}

export enum API_STATUS {
	INITIAL = 0,
	COMPLETED = 1,
	LOADING = 2,
	ERROR = 3,
}

export enum EVENT_NAME {
	ERROR_NOTIFY = 'error-notify',
}

export enum ENUM_CATEGORY {
	PLATFORM = 'Platform',
	DEVICE = 'Device',
	FEATURE = 'Feature',
	ME = 'ME',
}
