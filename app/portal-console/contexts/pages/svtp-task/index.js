import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
	fetchSVTPTasksAsync,
	fetchSVTPTaskAsync,
	createSVTPTaskAsync,
	updateSVTPTaskAsync,
	fetchProjectsAsync,
} from '../../../adapters/svtp-task-adapter';
import cloneDeep from 'lodash/cloneDeep';
import { SVTPLoadingStoreContext } from '../loading';
import { useAPIResponse } from '../utils';
import { API_STATUE } from '@lib/constants/general';

export const SVTPTaskStoreContext = React.createContext();

const {
	INITIAL,
	LOADING,
} = API_STATUE;
const propTypes = {
	children: PropTypes.node,
};

export const SVTPTaskStoreProvider = props => {
	const [task, setTask] = useState({});
	const [tasks, setTasks] = useState([]);
	const [projects, setProjects] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [createTaskLoadingStatus, setCreateTaskLoadingStatus] = useState(INITIAL);
	const [fetchTasksLoadingStatus, setFetchTasksLoadingStatus] = useState(INITIAL);
	const [fetchProjectsLoadingStatus, setFetchProjectsLoadingStatus] = useState(INITIAL);
	const { setIsLoading } = useContext(SVTPLoadingStoreContext);
	const { children } = props;
	const fetchTasks = async () => {
		setFetchTasksLoadingStatus(LOADING);

		const res = await fetchSVTPTasksAsync();
		const { isAPISuccess } = useAPIResponse(res, status => setFetchTasksLoadingStatus(status));

		if (isAPISuccess) {
			setTasks(res.data);
		}
	};
	const fetchTaskById = async id => {
		const res = await fetchSVTPTaskAsync(id);
		const cloneResponse = cloneDeep(res);

		Object.assign(cloneResponse.data, { notifyList: _convertNotifyList(cloneResponse.data.notifyList) });
		setTask(cloneResponse.data);
	};
	const createTask = async task => {
		_beforeSubmit();
		setCreateTaskLoadingStatus(LOADING);

		const res = await createSVTPTaskAsync(Object.assign(task, { phases: task.phases.map(phase => phase.phase) }));

		setTask(Object.assign({}, { id: res.data.svtpTaskId }));

		useAPIResponse(res, status => setCreateTaskLoadingStatus(status));
		_afterSubmit();
		return res;
	};
	const updateTask = async task => {
		_beforeSubmit();

		const cloneTask = cloneDeep(task);
		const res = await updateSVTPTaskAsync(Object.assign({}, {
			id: cloneTask.id,
			notifyList: cloneTask.notifyList.filter(email => email !== ''),
			pdm: cloneTask.pdm,
			odm: cloneTask.odm,
			phases: cloneTask.phases.filter(phase => phase.editable === true).map(phase => phase.phase),
			featureIds: task.featureIds,
		}));

		_afterSubmit();

		return res;
	};
	const fetchProjects = async () => {
		setFetchTasksLoadingStatus(LOADING);

		const res = await fetchProjectsAsync();
		const { isAPISuccess } = useAPIResponse(res, status => setFetchProjectsLoadingStatus(status));

		if (isAPISuccess) {
			setProjects(res.data);
		}
	};
	const _convertNotifyList = notifyList => {
		return notifyList.map(item => {
			return { Email: item.value };
		});
	};
	const _beforeSubmit = () => {
		setIsSubmitting(true);
		setIsLoading(true);
	};
	const _afterSubmit = () => {
		setIsSubmitting(false);
		setIsLoading(false);
	};

	return (
		<SVTPTaskStoreContext.Provider
			value={{
				task,
				tasks,
				projects,
				isSubmitting,
				createTaskLoadingStatus,
				fetchTasksLoadingStatus,
				fetchProjectsLoadingStatus,
				fetchTasks,
				fetchTaskById,
				createTask,
				updateTask,
				fetchProjects,
			}}
		>
			{children}
		</SVTPTaskStoreContext.Provider>
	);
};

SVTPTaskStoreProvider.propTypes = propTypes;
