import React from 'react';
import PropTypes from 'prop-types';
import { Route as DefaultRoute, matchPath, Redirect } from 'react-router-dom';
import { renderSwitcher } from './render-switcher';
import { replaceRouteParamProps } from './utils';

const propTypes = {
	route: PropTypes.shape({
		paramProps: PropTypes.object,
		path: PropTypes.string,
		routes: PropTypes.array,
		redirectPath: PropTypes.string,
	}),
	component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.node,
	]),
};
const Route = ({
	component: Page,
	route,
	...rest
}) => {
	return (
		<DefaultRoute
			{...rest}
			render={matchProps => {
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

Route.propTypes = propTypes;

export default Route;
