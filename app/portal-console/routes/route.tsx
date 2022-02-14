import React from 'react';
import PropTypes from 'prop-types';
import { Route as DefaultRoute, matchPath, Redirect } from 'react-router-dom';
import { renderSwitcher } from './render-switcher';
import { replaceRouteParamProps } from './utils';
import { DefaultRouteProp } from '@lib/types/routeType';

const Route = ({
	Page,
	route,
	...rest
}: DefaultRouteProp) => {
	return (
		<DefaultRoute
			{...rest}
			render={(matchProps: { match: any, history: any, location: any }) => {
				const {
					match,
					history,
					location,
				} = matchProps;
				const pathName = location.pathname;
				const {
					path,
					routes,
					paramProps,
					redirectPath,
				} = route;
				const routeParamProps = {};

				if (paramProps) {
					Object.keys(paramProps).forEach(key => {
						routeParamProps[key] = replaceRouteParamProps(paramProps[key], match.params);
					});
				}

				if (redirectPath) {
					if (matchPath(`${pathName}`, { path: `${path}`, exact: true })) {
						return <Redirect to={replaceRouteParamProps(redirectPath, match.params)}/>;
					}
				}

				function onNavigate(uri, params = { passProps: {} }) {
					history.push({
						pathname: uri,
						passProps: params.passProps,
					});
				}

				function onBack() {
					history.goBack();
				}

				return (
					<>
						<Page
							key={pathName}
							renderedRoutes={renderSwitcher(routes)}
							pathName={pathName}
							selectedClassName = "test-selected"
							onNavigate={onNavigate}
							onBack={onBack}
							{...routeParamProps}
							{...location.passProps}
						/>
					</>
				);
			}}
		/>
	);
};

export default Route;
