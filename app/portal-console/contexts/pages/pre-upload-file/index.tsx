import React, { useState } from 'react';
import { UPLOAD_RESULT, API_STATUS } from '@lib/constants/general';
import { FileType, PreUploadFileStoreContextType, UploadFuncAsyncType } from '@lib/types/preUploadFileContextType';
import { uploadFileAsync } from '@adapters/svtp-task-item-test-result-adapter';

const {
	ERROR,
	COMPLETE,
	LOADING,
} = UPLOAD_RESULT;

export const PreUploadFileStoreContext = React.createContext<PreUploadFileStoreContextType>({
	files: [],
	uploadFileLoadingStatus: API_STATUS.INITIAL,
	setFilesAfterCheck: () => {},
	resetFiles: () => {},
	removeFile: () => {},
	uploadTestResultFiles: () => {},
});

const PreUploadFileStoreProvider = ({ key, children }: {key: string, children?: React.ReactNode}) => {
	const [files, setFiles] = useState<FileType[]>([]);
	const [uploadFileLoadingStatus, setUploadFileLoadingStatus] = useState<API_STATUS>(API_STATUS.INITIAL);
	const setFilesAfterCheck = finishedFiles => {
		setFiles([...files, ...finishedFiles]);
	};
	const resetFiles = () => {
		setFiles([]);
	};
	const removeFile = updateFiles => {
		setFiles(updateFiles);
	};
	const uploadTestResultFiles = async () => {
		await uploadFiles(uploadFileAsync);
	};
	const uploadFiles = async (uploadFuncAsync: UploadFuncAsyncType) => {
		const promise = [];

		files.forEach(({ file }) => {
			promise.push(
				uploadFuncAsync(
					file,
					_handleSingleFileUploadResponseResolve,
					_handleSingleFileUploadResponseReject,
				),
			);
		});

		_handleChangeFileToLoading();

		const response = await Promise.all(promise);

		_handleUploadCompleted(response);
	};

	function _handleSingleFileUploadResponseResolve(response) {
		const updateFiles = files.map(file => {
			if (file.fileName === response[0]) {
				file.message = 'Upload completed.';
				file.checkStatus = COMPLETE;
			}

			return file;
		});

		setFiles(updateFiles);
	}

	function _handleSingleFileUploadResponseReject(response) {
		const updateFiles = files.map(file => {
			if (file.fileName === response) {
				file.message = 'Upload failed.';
				file.checkStatus = ERROR;
			}

			return file;
		});

		setFiles(updateFiles);
	}

	function _handleChangeFileToLoading() {
		const updateFiles = files.map(file => {
			file.checkStatus = LOADING;
			file.message = 'Uploading...';
			return file;
		});

		setFiles(updateFiles);
		setUploadFileLoadingStatus(API_STATUS.LOADING);
	}

	function _handleUploadCompleted(responses) {
		if (responses.some(response => response !== undefined)) {
			setUploadFileLoadingStatus(API_STATUS.COMPLETED);
		}
	}

	return (
		<PreUploadFileStoreContext.Provider
			value={{
				files,
				uploadFileLoadingStatus,
				setFilesAfterCheck,
				resetFiles,
				removeFile,
				uploadTestResultFiles,
			}}
		>
			{children}
		</PreUploadFileStoreContext.Provider>
	);
};

export {
	PreUploadFileStoreProvider,
};
