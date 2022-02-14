import React, { useState, useContext } from 'react';
import {
	fetchSVTPTasksAsync,
	fetchSVTPTaskAsync,
	createSVTPTaskAsync,
	updateSVTPTaskAsync,
	fetchProjectsAsync,
} from '../../../adapters/svtp-task-adapter';
import cloneDeep from 'lodash/cloneDeep';
import { SVTPLoadingStoreContext } from '../loading';
import { useAPIFetcher } from '../utils';
import { API_STATUS } from '@lib/constants/general';
import { SVTPTaskStoreContextType, TaskType, ProjectType } from '@lib/types/svtpTaskContextType';

const {
	INITIAL,
} = API_STATUS;

export const SVTPTaskStoreContext = React.createContext<SVTPTaskStoreContextType>({
	task: null,
	tasks: [],
	projects: [],
	isSubmitting: false,
	createTaskLoadingStatus: INITIAL,
	updateTaskLoadingStatus: INITIAL,
	fetchTasksLoadingStatus: INITIAL,
	fetchTaskLoadingStatus: INITIAL,
	fetchProjectsLoadingStatus: INITIAL,
	fetchTasks: () => {},
	fetchTaskById: () => {},
	createTask: () => {},
	updateTask: async () => {
		return {
			data: {
				id: '',
			},
		};
	},
	fetchProjects: () => {},
});

export const SVTPTaskStoreProvider = ({ key, children }: {key: string, children?: React.ReactNode}) => {
	const [task, setTask] = useState<TaskType | Record<any, never>>({});
	const [tasks, setTasks] = useState<TaskType[]>([]);
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const { setIsLoading } = useContext(SVTPLoadingStoreContext);
	const [fetchTasksLoadingStatus, wrappedFetchTasks] = useAPIFetcher<TaskType[]>();
	const [fetchTaskLoadingStatus, wrappedFetchTask] = useAPIFetcher<TaskType>();
	const [createTaskLoadingStatus, wrappedCreateTask] = useAPIFetcher<TaskType>([task]);
	const [updateTaskLoadingStatus, wrappedUpdateTaskLoadingStatus] = useAPIFetcher<TaskType>();
	const [fetchProjectsLoadingStatus, wrappedFetchProjects] = useAPIFetcher<ProjectType[]>();
	const fetchTasks = async () => {
		const [isAPISuccess, res] = await wrappedFetchTasks(() => fetchSVTPTasksAsync<TaskType[]>());

		if (isAPISuccess) {
			setTasks(res.data);
		}
	};
	const fetchTaskById = async id => {
		const [isAPISuccess, res] = await wrappedFetchTask(() => fetchSVTPTaskAsync<TaskType>(id));

		if (isAPISuccess) {
			const cloneResponse = cloneDeep(res);

			Object.assign(cloneResponse.data, { notifyList: _convertNotifyList(cloneResponse.data.notifyList) });
			setTask(cloneResponse.data);
		}
	};
	const createTask = async task => {
		_beforeSubmit();

		const body = Object.assign(task, { phases: task.phases.map(phase => phase.phase) });
		const [isAPISuccess, res] = await wrappedCreateTask(() => createSVTPTaskAsync<TaskType>(body));

		if (isAPISuccess) {
			setTask(Object.assign({}, { id: res.data.id }));

			_afterSubmit();
			return res;
		}
	};
	const updateTask = async (task) : Promise<{
		data: {
			id: string,
			[x: string]: unknown,
		}
	}> => {
		_beforeSubmit();

		const cloneTask = cloneDeep(task);
		const body = Object.assign({}, {
			id: cloneTask.id,
			notifyList: cloneTask.notifyList.filter(email => email !== ''),
			pdm: cloneTask.pdm,
			odm: cloneTask.odm,
			phases: cloneTask.phases.filter(phase => phase.editable === true).map(phase => phase.phase),
			featureIds: task.featureIds,
		});
		const [isAPISuccess, res] = await wrappedUpdateTaskLoadingStatus(() => updateSVTPTaskAsync<TaskType>(body));

		if (isAPISuccess) {
			_afterSubmit();

			return res;
		}
	};
	const fetchProjects = async () => {
		const [isAPISuccess, res] = await wrappedFetchProjects(() => fetchProjectsAsync<ProjectType[]>());

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
				fetchTaskLoadingStatus,
				updateTaskLoadingStatus,
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
