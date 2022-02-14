import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Block from 'hp-swt-react-component/dest/esm/components/block';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import InfoList from './info-list';
import PhaseTab from './phase-tab';
import TaskModal from '@components/task-modal';
import PageTitle from '@components/page-title';
import { Text, Center } from '@chakra-ui/react';
import { MdOutlineEdit } from '@components/icon';
import {
	SVTPTaskStoreContext,
	SVTPTaskItemStoreContext,
	PreUploadFileStoreContext,
	SVTPTaskItemTestResultStoreContext,
} from '@contexts';
import cloneDeep from 'lodash/cloneDeep';
import { getMatchPhase, isEmptyObject } from '@lib/general/utils';
import { API_STATUS } from '@lib/constants/general';
import isEqual from 'lodash/isEqual';

const propTypes = {
	task: PropTypes.shape({
		svtpTaskId: PropTypes.string,
		projectName: PropTypes.string,
		phases: PropTypes.array,
		generation: PropTypes.string,
		series: PropTypes.string,
		platformType: PropTypes.string,
		odm: PropTypes.array,
		pdm: PropTypes.array,
		notifyList: PropTypes.array,
		updateAt: PropTypes.string,
	}),
	svtpTaskId: PropTypes.string,
};
const defaultTypes = {
	task: {},
	svtpTaskId: '',
};

function TaskDetailPage({
	svtpTaskId,
}) {
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const { fetchTaskById, task } = useContext(SVTPTaskStoreContext);
	const {
		taskItemQueryParameters,
		fetchTaskItems,
		updateScheduleLoadingStatus,
		updateWaivedOrBlockedLoadingStatus,
		deleteSVTPTaskItemLoadingStatus,
	} = useContext(SVTPTaskItemStoreContext);
	const { updateTestResultObsNumbersStatus } = useContext(SVTPTaskItemTestResultStoreContext);
	const { uploadFileLoadingStatus } = useContext(PreUploadFileStoreContext);
	const {
		generation,
		series,
		projectName,
		phases,
	} = task;
	const defaultPhase: { id?: string; value?: string; } = task ? getMatchPhase(task.phases) : {};
	const {
		phaseId,
		queryParams,
	} = taskItemQueryParameters;

	function _handleReload(svtpTaskId) {
		fetchTaskById(svtpTaskId);
	}

	const _convertTask = task => {
		const cloneTask = cloneDeep(task);

		if (!isEmptyObject(cloneTask) && (cloneTask.phases)) {
			Object.assign(cloneTask, {
				phases: cloneTask.phases.map(phase => {
					return { phase: phase.value, editable: false };
				}),
			});
		}

		return cloneTask;
	};
	const ref = useRef({});

	useEffect(() => {
		fetchTaskById(svtpTaskId);
	}, [svtpTaskId]);

	useEffect(() => {
		const hasPhase = task.phases && task.phases.length > 0;

		if (ref.current && !isEqual(ref.current, task) && hasPhase) {
			fetchTaskItems(defaultPhase.id);
		}
	}, [task]);

	useEffect(() => {
		if (uploadFileLoadingStatus === API_STATUS.COMPLETED) {
			fetchTaskItems(phaseId, queryParams);
		}
	}, [uploadFileLoadingStatus]);
	useEffect(() => {
		if (updateScheduleLoadingStatus === API_STATUS.COMPLETED) {
			fetchTaskItems(phaseId, queryParams);
		}
	}, [updateScheduleLoadingStatus]);

	useEffect(() => {
		if (updateWaivedOrBlockedLoadingStatus === API_STATUS.COMPLETED) {
			fetchTaskItems(phaseId, queryParams);
		}
	}, [updateWaivedOrBlockedLoadingStatus]);
	useEffect(() => {
		if (updateTestResultObsNumbersStatus === API_STATUS.COMPLETED) {
			fetchTaskItems(phaseId, queryParams);
		}
	}, [updateTestResultObsNumbersStatus]);
	useEffect(() => {
		if (deleteSVTPTaskItemLoadingStatus === API_STATUS.COMPLETED) {
			fetchTaskItems(phaseId, queryParams);
		}
	}, [deleteSVTPTaskItemLoadingStatus]);
	useEffect(() => {
		ref.current = task;
	});

	return (
		<span>
			<div className="page_header">
				<PageTitle textList={[generation, series, projectName]} isShowLabels={true}></PageTitle>
			</div>
			<Block className="background--grey card"
				shadowNumber={0}>
				<section className="card_section">
					<Text fontSize="sm"
						fontWeight="bold"
						className="card_title">
						Project Information
					</Text>
					<Block className="background--white card"
						shadowNumber={0}>
						<Button
							className="btn--indigo"
							onClick={() => setIsTaskModalOpen(true)}
							text="Edit Task"
							icon={(<MdOutlineEdit size={{ h: 5, w: 5 }} />)}
						/>
						<TaskModal
							isOpen={isTaskModalOpen}
							onReload={_handleReload}
							isNew={false}
							initialValues={_convertTask(task)}
							onClose={() => setIsTaskModalOpen(false)}
						/>
						<InfoList listData={task} />
					</Block>
				</section>
				<PhaseTab
					project={projectName}
					phases={phases}
					onOpenTaskModal={() => setIsTaskModalOpen(true)}
				/>
				{
					(phases && phases.length < 1) && <Center
						py= {8}
						m={6}
						className="dashed-box"
					>
						<Text
							color="gray.500"
							fontSize="sm"
							mb={2}>
						There's no existing phase yet.
						</Text>
					</Center>
				}
			</Block>
		</span>
	);
}

TaskDetailPage.propTypes = propTypes;
TaskDetailPage.defaultTypes = defaultTypes;

export default TaskDetailPage;
