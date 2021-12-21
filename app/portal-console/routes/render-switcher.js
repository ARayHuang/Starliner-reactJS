import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './route';

function renderRoutes(routePaths, routes) {
	return routes.map((route, index) => (
		<Route
			key={route.key || index}
			path={route.path}
			exact={route.exact}
			strict={route.strict}
			component={route.component}
			route={route}
			routePaths={routePaths}
		/>
	));
}

export function renderSwitcher(
	routes,
	switchProps = {},
) {
	return routes ? (
		<Switch {...switchProps}>
			{renderRoutes([], routes)}
		</Switch>
	) : null;
}
