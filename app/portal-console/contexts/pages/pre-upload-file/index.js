import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { groupBy } from '@lib/general/utils';
import { fetchAllSVTPTaskItemsAsync } from '../../../adapters/svtp-task-item-adapter';
import { uploadFileAsync } from '../../../adapters/svtp-task-item-test-result-adapter';
import { UPLOAD_RESULT_ENUM, API_STATUE } from '@lib/constants/general';

export const PreUploadFileStoreContext = React.createContext();

const {
	INITIAL,
	COMPLETED,
	LOADING,
} = API_STATUE;
const defaultTask = {
	task: '',
	phase: '',
};
const propTypes = {
	children: PropTypes.node,
};
const PreUploadFileStoreProvider = ({ children }) => {
	const [uploadFileLoadingStatus, setUploadFileLoadingStatus] = useState(INITIAL);
	const [files, setFiles] = useState([]);
	const [items, setItems] = useState({});
	const [task, setTask] = useState(defaultTask);
	const fetchAllTaskItems = async phaseId => {
		const res = await fetchAllSVTPTaskItemsAsync(phaseId);

		if (res) {
			const { data } = res;
			const taskItems = data;
			const taskItemMap = groupBy(taskItems, item => item.subItem ? `${item.item}^${item.subItem}` : item.item);

			setItems(taskItemMap);
		}
	};
	const setTaskInfo = task => {
		setTask(task);
	};
	const setFilesAfterCheck = finishedFiles => {
		setFiles([...files, ...finishedFiles]);
	};
	const resetFiles = () => {
		setFiles([]);
	};
	const removeFile = updateFiles => {
		setFiles(updateFiles);
	};
	const uploadFiles = async () => {
		const promise = [];

		files.forEach(({ file }) => {
			promise.push(
				uploadFileAsync(
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
				file.checkStatus = UPLOAD_RESULT_ENUM.COMPLETE;
			}

			return file;
		});

		setFiles(updateFiles);
	}

	function _handleSingleFileUploadResponseReject(response) {
		const updateFiles = files.map(file => {
			if (file.fileName === response) {
				file.message = 'Upload failed.';
				file.checkStatus = UPLOAD_RESULT_ENUM.ERROR;
			}

			return file;
		});

		setFiles(updateFiles);
	}

	function _handleChangeFileToLoading() {
		const updateFiles = files.map(file => {
			file.checkStatus = UPLOAD_RESULT_ENUM.LOADING;
			file.message = 'Uploading...';
			return file;
		});

		setFiles(updateFiles);
		setUploadFileLoadingStatus(LOADING);
	}

	function _handleUploadCompleted(responses) {
		if (responses.some(response => response !== undefined)) {
			setUploadFileLoadingStatus(COMPLETED);
		}
	}

	return (
		<PreUploadFileStoreContext.Provider
			value={{
				task,
				files,
				items,
				uploadFileLoadingStatus,
				setTaskInfo,
				setFilesAfterCheck,
				fetchAllTaskItems,
				resetFiles,
				removeFile,
				uploadFiles,
			}}
		>
			{children}
		</PreUploadFileStoreContext.Provider>
	);
};

PreUploadFileStoreProvider.propTypes = propTypes;

export {
	PreUploadFileStoreProvider,
};
