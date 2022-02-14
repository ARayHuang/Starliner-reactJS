import React, { useEffect, useState } from 'react';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import {
	DeleteForeverOutlined,
	OutlineDownload,
	OutlineEditCalendar,
	OutlineCheck,
	OutlineClose,
} from '../icon';
import TestResultScheduleModal from '../test-result-schedule-modal';
import WaivedOrBlockedConfirmModal from './waived-or-blocked-confirm-modal';
import DeleteItemConfirmModal from './delete-item-confirm-modal';
import Table, { CollapsedTable } from 'hp-swt-react-component/dest/esm/components/table';
import { Select } from 'hp-swt-react-component/dest/esm/components/select';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import {
	Box,
	HStack,
} from '@chakra-ui/react';
import DownloadFile from '../../pages/SVTPpage/main/download-file';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import ObsTableItem from './obs-table-item';

const dateFormat = 'yyyy/MM/dd';
const actionOptions = [
	{
		label: 'Waived',
		value: 'Waived',
	},
	{
		label: 'Block',
		value: 'Blocked',
	},
];
const propTypes = {
	style: PropTypes.object,
	rowData: PropTypes.arrayOf(
		PropTypes.shape({
			category: PropTypes.string,
			vendor: PropTypes.string,
			itemName: PropTypes.string,
			startTime: PropTypes.string,
			endTime: PropTypes.string,
			resultStatus: PropTypes.string,
			leverageFrom: PropTypes.string,
			taskItemTestResults: PropTypes.array,
		})).isRequired,
};
const defaultProps = {
	rowData: {},
};

function TestItemTable({ rowData }) {
	const [dataSource, setDataSource] = useState([]);
	const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
	const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
	const [isWaivedOrBlockedModalOpen, setIsWaivedOrBlockedModalOpen] = useState(false);
	const [isDeleteItemConfirmModalOpen, setIsDeleteItemConfirmModalOpen] = useState(false);
	const [activeTestItem, setActiveTestItem] = useState<{
		id: string,
		startAt: string,
		endAt: string,
		waivedOrBlocked: string,
	} | Record<string, never>>({});
	const [activeTestResult, setActiveTestResult] = useState<{
		id: string,
		testItem: string,
	} | Record<string, never>>({});
	const {
		id: testItemId,
		startAt,
		endAt,
		waivedOrBlocked,
	} = activeTestItem;
	const {
		id: testResultId,
		testItem,
	} = activeTestResult;
	const itemCellColumns = [
		{
			Header: 'TestItem',
			accessor: 'testItem',
			isShown: false,
		},
		{
			Header: 'TestItemId',
			accessor: 'id',
			isShown: false,
		},
		{
			Header: 'Item',
			accessor: 'item',
		},
		{
			Header: 'Category',
			accessor: 'category',
		},
		{
			Header: 'Description',
			accessor: 'information',
		},
		{
			Header: 'Start Time',
			accessor: 'startAt',
			isShown: false,
		},
		{
			Header: 'End Time',
			accessor: 'endAt',
			isShown: false,
		},
		{
			Header: 'Test Schedule Plan',
			accessor: 'schedule',
			Cell: ({ row }) => {
				const { values } = row;
				const { startAt, endAt } = values;
				const startAtParseISO = startAt ? format(parseISO(startAt), dateFormat) : '';
				const endAtParseISO = endAt ? format(parseISO(endAt), dateFormat) : '';
				const btnText = (startAt || endAt) ? startAtParseISO + ' ~ ' + endAtParseISO : 'Make Schedule';

				return <Button
					icon={<OutlineEditCalendar size={{ w: 5, h: 5 }} />}
					className="btn--indigo btn--round"
					text={btnText}
					onClick={() => {
						setActiveTestItem(values);
						setIsScheduleModalOpen(true);
					}}
				/>;
			},
		},
		{
			Header: 'Leverage From',
			accessor: 'leverageFrom',
		},
		{
			Header: 'Waived/Block',
			accessor: 'waivedOrBlocked',
			Cell: ({ row }) => {
				const { values } = row;
				const { waivedOrBlocked } = values;

				return (
					<Select
						options={actionOptions}
						value={waivedOrBlocked ? waivedOrBlocked : ''}
						placeholder="Select"
						styled={{ bg: 'white' }}
						onChange={e => {
							const nextValues = Object.assign(values, {
								waivedOrBlocked: e.target.value,
							});

							setActiveTestItem(nextValues);
							setIsWaivedOrBlockedModalOpen(true);
						}}
					/>
				);
			},
		},
		{
			Header: 'Action',
			Cell: ({ row }) => {
				const { values } = row;

				return <HStack spacing="8px">
					<IconButton
						icon={<DeleteForeverOutlined size={{ w: 5, h: 5 }} />}
						className="btn--orangeRed"
						onClick={() => {
							setActiveTestItem(values);
							setIsDeleteItemConfirmModalOpen(true);
						}}
					/>
				</HStack>;
			},
		},
		{
			Header: 'taskItemTestResults',
			accessor: 'taskItemTestResults',
			isShown: false,
		},
	];
	const reshapeObsData = obsNumbers => {
		const shapedObsNumbers = obsNumbers.map(obs => {
			return { value: obs };
		});

		return shapedObsNumbers;
	};
	const testResultCellColumns = [
		{
			Header: 'Vendor',
			accessor: 'vendor',
		},
		{
			Header: 'Test Result',
			accessor: 'resultStatus',
			Cell: ({ row }) => {
				const { values } = row;

				return <HStack spacing="8px">
					{values.resultStatus === 'PASS' ? <Box className="text--emrald"><OutlineCheck size={{ w: 5, h: 5 }} /></Box> : null}
					{values.resultStatus === 'FAILED' ? <Box className="text--orangeRed"><OutlineClose size={{ w: 5, h: 5 }} /></Box> : null}
					<Box>{values.resultStatus}</Box>
				</HStack>;
			},
		},
		{
			Header: 'OBS #',
			accessor: 'obsNumbers',
			Cell: ({ row }) => {
				const { values } = row;

				return (values.resultStatus === 'FAILED' ? <ObsTableItem testResultId={values.id} obsList={reshapeObsData(values.obsNumbers)} /> : null);
			},
		},
		{
			Header: 'Action',
			Cell: ({ row }) => {
				const { values } = row;

				return <HStack spacing="8px">
					<IconButton icon={<DeleteForeverOutlined size={{ w: 5, h: 5 }} />} className="btn--orangeRed" ></IconButton>
					<IconButton
						icon={<OutlineDownload size={{ w: 5, h: 5 }} />}
						className="btn--indigo"
						onClick={() => {
							setActiveTestResult(values);
							setIsDownloadModalOpen(true);
						}}></IconButton>
				</HStack>;
			},
		},
		{
			Header: 'TestItem',
			accessor: 'testItem',
			isShown: false,
		},
		{
			Header: 'testResultId',
			accessor: 'id',
			isShown: false,
		},
	];
	const _basicDataSource = () => {
		return dataSource.map(item => {
			item.subData = item.taskItemTestResults;
			return item;
		});
	};

	function _renderCollapsedChildren(values) {
		const { taskItemTestResults } = values;

		return (
			<Box px="5%" className="sub_table">
				<Table columns={testResultCellColumns} dataSource={taskItemTestResults} />
			</Box>
		);
	}

	useEffect(() => {
		setDataSource(rowData);
	}, [rowData]);

	return (
		<Box py="20px" className="starliner_table">
			<CollapsedTable
				columns={itemCellColumns}
				dataSource={_basicDataSource()}
				onCollapsedChange={data => setDataSource(data)}
				onRenderCollapsedChildren={values => _renderCollapsedChildren(values)}
				hasCollapsed
				size="sm"
			/>
			<DownloadFile
				description="description"
				testResultId={testResultId}
				testItemNum={testItem}
				isOpen={isDownloadModalOpen}
				onOpen={() => {
					setIsDownloadModalOpen(true);
				}}
				onClose={() => {
					setIsDownloadModalOpen(false);
				}}
			/>
			<TestResultScheduleModal
				isOpen={isScheduleModalOpen}
				testItemId={testItemId}
				initialStartAt={startAt ? format(parseISO(startAt), dateFormat) : ''}
				initialEndAt={endAt ? format(parseISO(endAt), dateFormat) : ''}
				onClose={() => {
					setIsScheduleModalOpen(false);
				}}
			/>
			<WaivedOrBlockedConfirmModal
				isOpen={isWaivedOrBlockedModalOpen}
				testItemId={testItemId}
				waivedOrBlocked={waivedOrBlocked}
				onClose={() => {
					setIsWaivedOrBlockedModalOpen(false);
				}}
			/>
			<DeleteItemConfirmModal
				isOpen={isDeleteItemConfirmModalOpen}
				taskItemId={testItemId}
				onClose={() => {
					setIsDeleteItemConfirmModalOpen(false);
				}}
			/>
		</Box>
	);
}

TestItemTable.propTypes = propTypes;
TestItemTable.defaultProps = defaultProps;

export default TestItemTable;
