import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';
import { RouteConfigProp } from '@lib/types/routeType';

function renderRoutes(routes: RouteConfigProp[]) {
	return routes.map((route, index) => (
		<Route
			key={`${route.path}-${index}`}
			path={route.path}
			exact={route.exact}
			Page={route.component}
			route={route}
			redirectPath={route.redirectPath}
		/>
	));
}

export function renderSwitcher(
	routes,
) {
	return routes ? (
		<Switch>
			{renderRoutes(routes)}
		</Switch>
	) : null;
}
