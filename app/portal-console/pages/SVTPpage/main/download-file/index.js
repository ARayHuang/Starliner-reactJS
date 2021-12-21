import React, { useContext, useEffect } from 'react';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import Table from 'hp-swt-react-component/dest/esm/components/table';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import PropTypes from 'prop-types';
import { SVTPTaskItemTestResultStoreContext } from '@contexts';
import { Center } from '@chakra-ui/react';
import { OutlineDownload } from '@components/icon';
import { ModalFooter, ModalHeader } from '@components/modal';

const propTypes = {
	description: PropTypes.string,
	testResultId: PropTypes.string,
	testItemNum: PropTypes.string,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	isOpen: PropTypes.bool,
};
const defaultProps = {
	description: 'Memory ECC Validation',
	testResultId: '',
	testItemNum: 'AC01',
	testResultFiles: [
		{
			fileName: 'Acoustic',
			uploadTime: '2021-08-31',
			uploadBy: 'user@hp.com',
		},
		{
			fileName: 'Acoustic',
			uploadTime: '2020-09-01',
			uploadBy: 'user@hp.com',
		},
	],
	onOpen: () => {},
	onClose: () => {},
	isOpen: false,
};

function DownloadFile({ description, testResultId, testItemNum, onOpen, onClose, isOpen }) {
	const { fetchTestResultFiles, resetTestResultFiles, downloadTestResultFile, testResultFiles } = useContext(SVTPTaskItemTestResultStoreContext);

	useEffect(() => {
		if (isOpen) {
			fetchTestResultFiles(testResultId);
		}
	}, [isOpen]);

	const customCellColumns = [
		{
			Header: 'File Name',
			accessor: 'fileName',
		},
		{
			Header: 'Upload Time',
			accessor: 'uploadAt',
			Cell: ({ row }) => {
				const { values } = row;

				return <span className="cell_nowrap">{values.uploadAt}</span>;
			},
		},
		{
			Header: 'Upload By',
			accessor: 'uploadBy',
		},
		{
			Header: 'S3FileAccessKey',
			accessor: 's3FileAccessKey',
			isShown: false,
		},
		{
			Header: 'VersionId',
			accessor: 'versionId',
			isShown: false,
		},
		{
			Header: 'Action',
			Cell: ({ row }) => {
				const { values } = row;

				return <IconButton
					className="btn--indigo"
					icon={<OutlineDownload size={{ w: 5, h: 5 }}/>}
					onClick={() => {
						downloadTestResultFile(values.s3FileAccessKey, values.versionId, values.fileName);
					}}
				>
				</IconButton>;
			},
		},
	];
	const _renderModalTitle = () => {
		return <ModalHeader>
			<span className="text--indigo">
				<OutlineDownload />
			</span>
			<span>Archive of ({testItemNum} - {description})</span>
		</ModalHeader>;
	};
	const _handleOnClose = () => {
		resetTestResultFiles([]);
		onClose();
	};
	const _onRenderFooter = () => {
		return (
			<ModalFooter>
				<Button variant="outline" className="btn--outline--indigo" onClick={_handleOnClose} text="Close"></Button>
			</ModalFooter>);
	};

	return (
		<>
			<Modal isOpen={isOpen}
				className="download-table"
				onClose={_handleOnClose}
				size={Modal.SizeEnum.SIZE3xl}
				headerTitle={_renderModalTitle()}
				onRenderFooter={_onRenderFooter}>
				<div>
					<Table columns={customCellColumns} dataSource={testResultFiles} />
				</div>
			</Modal>
		</>
	);
}

DownloadFile.propTypes = propTypes;
DownloadFile.defaultProps = defaultProps;

export default DownloadFile;
