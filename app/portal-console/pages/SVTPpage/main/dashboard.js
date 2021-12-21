import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Block from 'hp-swt-react-component/dest/esm/components/block';
import Table from 'hp-swt-react-component/dest/esm/components/table';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import PageTitle from '@components/page-title';
import TaskModal from '@components/task-modal';
import { Text, HStack } from '@chakra-ui/react';
import { SVTPTaskStoreContext } from '@contexts/svtp-task';
import { OutlineSearch, OutlineLeaderboard, AddOutlined } from '@components/icon';
import { format, parseISO } from 'date-fns';
import { usePrevious } from '@lib/general/utils';
import { API_STATUE } from '@lib/constants/general';

const {
	COMPLETED,
	LOADING,
} = API_STATUE;
const propTypes = {
	svtpTaskId: PropTypes.string,
	tasks: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		projectName: PropTypes.string,
		platformType: PropTypes.string,
		phase: PropTypes.string,
		odm: PropTypes.array,
		updateAt: PropTypes.string,
	})),
	onNavigate: PropTypes.func,
};
const defaultTypes = {
	tasks: [],
	onNavigate: () => {},
};

function SVTPmain({
	onNavigate,
}) {
	const pageName = 'SVTP Tasks';
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const { fetchTasks, tasks, task, createTaskLoadingStatus } = useContext(SVTPTaskStoreContext);
	const prevCreateTaskLoadingStatus = usePrevious(createTaskLoadingStatus);
	const columns = [
		{
			Header: 'Id',
			accessor: 'id',
			isShown: false,
		},
		{
			Header: 'Project',
			accessor: 'projectName',
		},
		{
			Header: 'Phase',
			accessor: 'phases',
			Cell: ({ value }) => {
				return value.map(item => item.value).join(',');
			},
		},
		{
			Header: 'Update Time',
			accessor: 'updatedAt',
			Cell: ({ value }) => {
				return format(parseISO(value), 'yyyy-MM-dd');
			},
		},
		{
			Header: 'ODM',
			accessor: 'odm',
			Cell: ({ value }) => {
				return value.map(odm => odm).join(',');
			},
		},
		{
			Header: 'Action',
			Cell: ({ row }) => {
				return (<HStack spacing="8px">
					<IconButton
						icon={<OutlineSearch />}
						size={IconButton.Size.MD}
						className="btn--indigo"
						onClick={() => _NavigateToDetail(row.values.id)}
					/>
					<IconButton
						icon={<OutlineLeaderboard />}
						className="btn--amber"
						size={IconButton.Size.MD}
					/>
				</HStack>);
			},
		},
	];

	function _NavigateToDetail(svtpTaskId) {
		onNavigate(`/svtp/main/${svtpTaskId}`);
	}

	function _handleReload() {
		fetchTasks();
	}

	function _renderTable() {
		return tasks.length > 0 ?
			<Table columns={columns} dataSource={tasks} size="sm"/> :
			<><Text
				color="gray.500"
				fontSize="sm"
				mb={2}>
				There's no existing task yet. Start a task
			</Text>
			<Button
				className="btn--indigo"
				onClick={() => setIsTaskModalOpen(true)}
				text="Create Task"
				icon={(<AddOutlined size={{ h: 5, w: 5 }}/>)}
			/>
			</>;
	}

	useEffect(() => {
		fetchTasks();
	}, []);

	useEffect(() => {
		if (prevCreateTaskLoadingStatus === LOADING) {
			if (createTaskLoadingStatus === COMPLETED) {
				_NavigateToDetail(task.id);
			}
		}
	}, [createTaskLoadingStatus]);

	return (
		<span>
			<div className="page_header">
				<PageTitle textList={[pageName]}></PageTitle>
				<Button
					className="btn--indigo"
					onClick={() => setIsTaskModalOpen(true)}
					text="Create Task"
					icon={(<AddOutlined size={{ h: 5, w: 5 }}/>)}
				/>
			</div>
			<Block 	className="background--grey card"
				shadowNumber={0}>
				<Text fontSize="sm"
					fontWeight="bold"
					className="card_title">Created Tasks</Text>
				<Block 	className="background--white card"
					shadowNumber={0}>
					{_renderTable()}
				</Block>
			</Block>
			<TaskModal
				isOpen={isTaskModalOpen}
				isCentered={false}
				onReload={_handleReload}
				onClose={() => setIsTaskModalOpen(false)}
				isNew
			/>
		</span>
	);
}

SVTPmain.propTypes = propTypes;
SVTPmain.defaultTypes = defaultTypes;

export default SVTPmain;
