import { isValid, parse, isBefore, isAfter, parseISO } from 'date-fns';

export const checkIsValidDate = value => {
	try {
		const date = parse(value, 'yyyy/MM/dd', new Date());

		return isValid(date);
	} catch (ex) {
		console.log(ex);
		return false;
	}
};

export const checkRangeDatePickerIsValid = (startAt, endAt) => {
	if (startAt && endAt) {
		return !(isBefore(parseISO(endAt), parseISO(startAt)) &&
		isAfter(parseISO(startAt), parseISO(endAt)));
	}

	return true;
};
