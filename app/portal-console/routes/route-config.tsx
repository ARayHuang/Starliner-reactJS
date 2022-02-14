import { loadComponent } from './utils';

// Load page for code splitting
const Root = loadComponent({ loader: () => import('../pages') });
const Home = loadComponent({ loader: () => import('../pages/home') });
const SVTP = loadComponent({ loader: () => import('../pages/SVTPpage') });
const SVTPMain = loadComponent({ loader: () => import('../pages/SVTPpage/main') });
const SVTPMainDashboard = loadComponent({ loader: () => import('../pages/SVTPpage/main/dashboard') });
const SVTPTaskDetail = loadComponent({ loader: () => import('../pages/SVTPpage/main/task-detail') });
const SVTPDownload = loadComponent({ loader: () => import('../pages/SVTPpage/download') });
const SVTPSettings = loadComponent({ loader: () => import('../pages/SVTPpage/settings') });

export const RouteKeyEnums = {
	ROOT: '/',
	HOME: '/home',
	SVTP: '/svtp',
	SVTP_MAIN: '/svtp/main',
	SVTP_DOWNLOAD: '/svtp/download',
	SVTP_SETTINGS: '/svtp/settings',
};

const routes = [
	{
		path: RouteKeyEnums.ROOT,
		component: Root,
		redirectPath: `${RouteKeyEnums.HOME}`,
		routes: [
			{
				path: RouteKeyEnums.HOME,
				component: Home,
			},
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
						path: RouteKeyEnums.SVTP_DOWNLOAD,
						component: SVTPDownload,
					},
					{
						path: RouteKeyEnums.SVTP_SETTINGS,
						component: SVTPSettings,
					},
				],
			},
		],
	},
];

export default routes;
