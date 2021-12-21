import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import { Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { BackupOutlined,
	DeleteForeverOutlined } from '@components/icon';
import Note from '@components/note';
import { ModalFooter, ModalHeader } from '@components/modal';
import {
	PreUploadFileStoreContext,
} from '@contexts';
import { useFileCheckService } from '../../../../services/use-file-check-service';
import { UPLOAD_RESULT_ENUM, API_STATUE } from '@lib/constants/general';
import { iconSettingMap } from './utils';

const FILE_UPLOAD_MAXIMUM = 30;
const noteConfigDefault = {
	message: '',
	noteStatus: Note.TypeEnum.ERROR,
};
const propTypes = {
	series: PropTypes.string,
	product: PropTypes.string,
	phase: PropTypes.shape({
		value: PropTypes.string,
		id: PropTypes.string,
	}),
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};
const defaultProps = {
	series: '',
	product: '',
};
const {
	ERROR,
	LOADING,
	WARNING,
} = UPLOAD_RESULT_ENUM;

function UploadResult({
	product,
	phase,
	isOpen,
	onClose,
}) {
	const [noteConfig, setNoteConfig] = useState(noteConfigDefault);
	const {
		setTaskInfo,
		fetchAllTaskItems,
		removeFile,
		resetFiles,
		uploadFiles,
		files,
		uploadFileLoadingStatus,
	} = useContext(PreUploadFileStoreContext);
	const { checkFile } = useFileCheckService();
	const _handleDrop = acceptedFiles => {
		acceptedFiles.forEach((file, index) => checkFile(file, index));
	};
	const isSubmitButtonDisabled = files.length === 0 || files.some(file => file.checkStatus === ERROR || file.checkStatus === WARNING);
	const _renderFiles = ({ fileName, checkStatus, message, key }, index) => {
		const { labelColor, icon } = iconSettingMap[checkStatus] || { labelColor: 'indigo', icon: null };

		return (
			<tr key={`${fileName} - ${index}`}>
				<td className={cx('status text--white',
					`text--white background--${labelColor}`,
					{ 'mini-loader': checkStatus === LOADING })}>
					{icon}
				</td>
				<td> { fileName }
					<Text className={`text--${checkStatus === ERROR ? 'orangeRed' : 'grey'}`}>
						{message}</Text>
				</td>
				{(
					<td>
						<IconButton
							icon={<DeleteForeverOutlined size={{ h: 5, w: 5 }} />}
							variant="outline"
							onClick={() => _removeFile(key)}
							className="btn--outline--indigo">
						</IconButton>
					</td>
				)}
			</tr>
		);
	};
	const _renderModalTitle = () => {
		return <ModalHeader>
			<span className="text--indigo">
				<BackupOutlined />
			</span>
			<span>Upload Test Result Report ({product} / {phase.value})</span>
		</ModalHeader>;
	};
	const _renderFooter = () => {
		return <ModalFooter>
			<Button
				className="btn--indigo"
				text="Upload"
				onClick={uploadFiles}
				styled={{
					mr: 3,
				}}
				isDisabled={isSubmitButtonDisabled}
			/>
			<Button
				variant="outline"
				className="btn--outline--indigo"
				onClick={onClose}
				text="Cancel"
			/>
		</ModalFooter>;
	};
	const _removeFile = fileKey => {
		const updateFiles = files.filter(file => file.key !== fileKey);

		removeFile([...updateFiles]);
	};
	const _handleClose = () => {
		setNoteConfig(noteConfigDefault);
		resetFiles();
		onClose();
	};

	useEffect(() => {
		if (Object.keys(phase).length > 0 && isOpen) {
			setTaskInfo({ phase: phase.value, product });
			fetchAllTaskItems(phase.id);
		}
	}, [phase.id, isOpen]);

	useEffect(() => {
		if (uploadFileLoadingStatus === API_STATUE.COMPLETED) {
			setNoteConfig(Object.assign({}, {
				message: 'Upload completed',
				noteStatus: Note.TypeEnum.SUCCESS,
			}));
		}
	}, [uploadFileLoadingStatus]);

	return (
		<>
			<Modal isOpen={isOpen}
				onClose={_handleClose}
				size={Modal.SizeEnum.SIZE3xl}
				headerTitle={_renderModalTitle()}
				onRenderFooter={_renderFooter}
			>
				{noteConfig.message.length > 1 && <Note
					text={noteConfig.message}
					type={noteConfig.noteStatus}/>}
				<Dropzone
					maxFiles={FILE_UPLOAD_MAXIMUM}
					onDrop={_handleDrop}
					onDropRejected={rejectFiles => {
						if (rejectFiles.length > FILE_UPLOAD_MAXIMUM) {
							setNoteConfig(Object.assign({}, {
								message: 'Number of files has exceeded the maximum',
								noteStatus: Note.TypeEnum.ERROR,
							}));
						}
					}}
				>
					{({ getRootProps, getInputProps }) => (
						<div {...getRootProps({ className: 'dropzone' })}>
							<input {...getInputProps()} />
							<BackupOutlined />
							<div>Drag and Drop files here, or click to select files</div>
						</div>
					)}
				</Dropzone>
				<Text className="text--grey" fontSize="sm">
					Result file naming exmaple:
					<strong> AAA_PV_NM02_....csv</strong>
				</Text>
				<div className="upload_file_list--draft">
					<table className="status_list_table">
						<tbody>
							{files.map((file, index) => (_renderFiles(file, index)))}
						</tbody>
					</table>
				</div>
			</Modal>
		</>
	);
}

UploadResult.propTypes = propTypes;
UploadResult.defaultProps = defaultProps;

export default UploadResult;
