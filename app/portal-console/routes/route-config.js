import { loadComponent } from './utils';

// Load page for code splitting
const SVTP = loadComponent({ loader: () => import('../pages/SVTPpage') });
const SVTPMain = loadComponent({ loader: () => import('../pages/SVTPpage/main') });
const SVTPMainDashboard = loadComponent({ loader: () => import('../pages/SVTPpage/main/dashboard') });
const SVTPTaskDetail = loadComponent({ loader: () => import('../pages/SVTPpage/main/task-detail') });
const SVTPManage = loadComponent({ loader: () => import('../pages/SVTPpage/manage') });
const SVTPOthers = loadComponent({ loader: () => import('../pages/SVTPpage/others') });

export const RouteKeyEnums = {
	SVTP: '/svtp',
	SVTP_MAIN: '/svtp/main',
	SVTP_MANAGE: '/svtp/manage',
	SVTP_OTHERS: '/svtp/others',
};

const routes = [
	{
		path: RouteKeyEnums.SVTP,
		component: SVTP,
		redirectPath: `${RouteKeyEnums.SVTP_MAIN}`,
		routes: [
			{
				path: `${RouteKeyEnums.SVTP_MAIN}`,
				component: SVTPMain,
				redirectPath: `${RouteKeyEnums.SVTP_MAIN}/dashboard`,
				routes: [
					{
						path: `${RouteKeyEnums.SVTP_MAIN}/dashboard`,
						component: SVTPMainDashboard,

					},
					{
						path: `${RouteKeyEnums.SVTP_MAIN}/:svtpTaskId`,
						component: SVTPTaskDetail,
						exact: true,
						paramProps: {
							svtpTaskId: ':svtpTaskId',
						},
					},
				],
			},
			{
				path: RouteKeyEnums.SVTP_MANAGE,
				component: SVTPManage,
			},
			{
				path: RouteKeyEnums.SVTP_OTHERS,
				component: SVTPOthers,
			},
		],
	},
];

export default routes;
