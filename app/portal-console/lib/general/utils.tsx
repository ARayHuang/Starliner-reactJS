import { useEffect, useRef } from 'react';
import { PHASE_ENUM } from '../constants/general';

export const getDisplayName = Component => {
	return Component.displayName || Component.name || 'Component';
};

export const groupBy = (arr, renderKey, column = '') => {
	const returnMap = {};

	if (Array.isArray(arr)) {
		arr.map(item => {
			const key = renderKey(item);

			returnMap[key] = column ? item[column] : item;
			return false;
		});
	}

	return returnMap;
};
export const getRandom = (min, max) => {
	return Math.round(Math.random() * max) + min;
};

// TODO: add unit test
export const getMatchPhase = (phases = []) => {
	let matchPhase = {};

	Object.values(PHASE_ENUM).some(item => {
		const matchArray = phases.filter(function (phase) {
			return phase.value.includes([item]);
		});

		if (Array.isArray(matchArray) && matchArray.length === 1) {
			matchPhase = Object.assign({}, matchArray[0]);
			return true;
		}

		if (Array.isArray(matchArray) && matchArray.length >= 1) {
			const latestPhase = matchArray.sort((prev, next) => next.value.localeCompare(prev.value));

			matchPhase = Object.assign({}, latestPhase[0]);
			return true;
		}

		return false;
	});

	return matchPhase;
};

export const generateUUID = () => {
	const timeStamp = new Date().getTime();
	const timeForMicrosecond = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;

	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let random0To16 = Math.random() * 16;

		if (timeStamp > 0) {
			random0To16 = (timeStamp + random0To16) % 16 | 0;
		} else {
			random0To16 = (timeForMicrosecond + random0To16) % 16 | 0;
		}

		return (c === 'x' ? random0To16 : (random0To16 & 0x3 | 0x8)).toString(16);
	});
};
export const isEmptyObject = obj => {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const usePrevious = value => {
	const ref = useRef();

	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};
