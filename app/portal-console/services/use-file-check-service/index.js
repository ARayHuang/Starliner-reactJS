import { useContext, useCallback } from 'react';
import { PreUploadFileStoreContext } from '@contexts';
import { parseFilename } from './utils';
import debounce from 'lodash/debounce';
import {
	checkHasDuplicateFile,
	checkIsExceedSize,
	checkIsAcceptedExtension,
	withError,
	withWarning,
	withKey,
} from './utils';

export const useFileCheckService = () => {
	const {
		items,
		task,
		files,
		setFilesAfterCheck,
	} = useContext(PreUploadFileStoreContext);
	let tempFiles = [...files];
	const checkFile = file => {
		let result = {};

		if (checkIsExceedSize(file)) {
			_handleCheckFinished(withWarning(
				file.name,
				`File size exceed 25MB: ${file.name}`,
			));
			return;
		}

		if (!checkIsAcceptedExtension(file.name)) {
			_handleCheckFinished(withWarning(
				file.name,
				`File extension only accept ['.xls', '.xlsx']: ${file.name}`,
			));
			return;
		}

		if (checkHasDuplicateFile(tempFiles, file)) {
			_handleCheckFinished(withWarning(
				file.name,
				`Duplicate file: ${file.name}`,
			));
			return;
		}

		result = parseFilename(file.name);

		try {
			if (result.project !== task.product) {
				_handleCheckFinished(withError(
					file.name,
					`Invalid project: It should be ${task.project}, got ${result.project} instead.`,
				));
				return;
			}

			if (result.phase !== task.phase) {
				_handleCheckFinished(withError(
					file.name,
					`Invalid phase: It should be ${task.phase}, got ${result.phase} instead.`,
				));
				return;
			}

			if (!items[result.item]) {
				_handleCheckFinished(withError(
					file.name,
					`Invalid item: no match ${result.item}`,
				));
				return;
			}
		} catch (err) {
			_handleCheckFinished(withError(
				file.name,
				`Invalid check file: no match ${err}`,
			));
			return;
		}

		_handleCheckFinished(withKey(Object.assign(result, { file })));
	};
	const _handleDebounce = debounce(value => {
		setFilesAfterCheck(value);
	}, 500);
	const _handleDebounceCallback = useCallback(value => _handleDebounce(value), []);
	const _handleCheckFinished = result => {
		tempFiles = [...tempFiles, result];

		_handleDebounceCallback((tempFiles));
	};

	return {
		checkFile,
	};
};
