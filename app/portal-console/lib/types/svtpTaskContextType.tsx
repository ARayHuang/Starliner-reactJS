import { API_STATUS } from '../constants/general';

export type TaskType = {
	id: string;
	projectName?: string;
	platformType?: string;
	series?: string;
	generation?: string;
    year?: string;
    odmName?: string;
	odm?: string[];
	pdm?: string[];
	phases?: KeyValuePairType[];
	notifyList?: KeyValuePairType[];
	taskPDMs?: OwnerType[];
	taskODMs?: OwnerType[];
	updatedAt?: string;
	metaData?: MetaDataType
}

export type KeyValuePairType = {
	id: string;
	value: string;
}

export type OwnerType = {
	id: string;
	userId: string;
	svtpTaskId: string;
	createdAt: string;
	updatedAt: string;
}

export type MetaDataType = {
	CurrentPage: number;
	TotalPages: number;
	PageSize: number;
	TotalCount: number;
	HasPrevious: boolean;
}

export type ProjectType = {
	projectName: string;
    generation: string;
    series: string;
    platformType: string;
    year: string;
    odmName: string;
}

export type SVTPTaskStoreContextType = {
	task: TaskType | Record<any, never>;
	tasks: TaskType[];
	projects: ProjectType[]
	isSubmitting: boolean;
	createTaskLoadingStatus: API_STATUS;
	updateTaskLoadingStatus: API_STATUS;
	fetchTasksLoadingStatus: API_STATUS;
	fetchTaskLoadingStatus: API_STATUS;
	fetchProjectsLoadingStatus: API_STATUS;
	fetchTasks: () => void;
	fetchTaskById: (id: string) => void;
	createTask: (createTask: TaskType) => void;
	updateTask: (createTask: TaskType) => Promise<{ data : { id: string, [key: string]: unknown}}>;
	fetchProjects: () => void;
}
