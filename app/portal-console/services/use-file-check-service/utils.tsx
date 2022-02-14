import { UPLOAD_RESULT } from '@lib/constants/general';
import { generateUUID } from '@lib/general/utils';
import { FileType } from '@lib/types/preUploadFileContextType';

const FILENAME_SPLIT_SYMBOL = '_';
const ITEM_SPLIT_SYMBOL = '-';
const SUBITEM_SPLIT_SYMBOL = '^';
const VERSION_INDEX = 0;
const PROJECT_INDEX = 1;
const PHASE_INDEX = 2;
const TEST_ITEM_INDEX = 3;
const VENDOR_INDEX = 4;
const FILE_SIZE_MAXIMUM = 1024 * 1024 * 25;

// TODO unit test
export const parseFilename = (filename: string) : FileType => {
	try {
		const key = filename.split(FILENAME_SPLIT_SYMBOL);

		if (key.length < 5) {
		// Handle error
			return {
				fileName: filename,
				checkStatus: UPLOAD_RESULT.ERROR,
				message: 'Invalid file name: File name lack of information. ',
			};
		}

		const itemKeys = key[TEST_ITEM_INDEX].split(ITEM_SPLIT_SYMBOL);
		const item = itemKeys.length > 0 ? itemKeys.shift() : '';
		const hasSubItem = item.includes(SUBITEM_SPLIT_SYMBOL);
		const subItem = hasSubItem ? item.split(SUBITEM_SPLIT_SYMBOL)[1] : '';

		return {
			version: key[VERSION_INDEX].trim(),
			project: key[PROJECT_INDEX].trim(),
			phase: key[PHASE_INDEX].trim(),
			item,
			subItem,
			information: itemKeys.join(ITEM_SPLIT_SYMBOL),
			vendor: key[VENDOR_INDEX].trim() !== 'vendor' ? key[VENDOR_INDEX].trim() : '',
			checkStatus: UPLOAD_RESULT.PRE_CHECK_SUCCESS,
			message: 'File name check completed',
			fileName: filename,
		};
	} catch (err) {
		return {
			fileName: filename,
			checkStatus: UPLOAD_RESULT.ERROR,
			message: `Invalid file name:${err}`,
		};
	}
};

export const checkHasDuplicateFile = (files, file) => {
	return files.some(item => item.fileName === file.name);
};

export const withKey = object => {
	return Object.assign(object, { key: generateUUID() });
};
export const withError = (fileName, message) => {
	return withKey({
		fileName,
		message,
		checkStatus: UPLOAD_RESULT.ERROR,
	});
};
export const withWarning = (fileName, message) => {
	return withKey({
		fileName,
		message,
		checkStatus: UPLOAD_RESULT.WARNING,
	});
};

export const checkIsExceedSize = file =>
	file.size > FILE_SIZE_MAXIMUM;

export const getFileExtension = filename =>
	filename.slice(filename.lastIndexOf('.'));

export const checkIsAcceptedExtension = filename => {
	const acceptedExtensions = ['.xls', '.xlsx'];
	const extension = getFileExtension(filename);

	return acceptedExtensions.some(acceptedExtension => {
		return acceptedExtension === extension;
	});
};

