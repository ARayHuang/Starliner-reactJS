import React from 'react';
import Loadable from 'react-loadable';

export function loadComponent(loader) {
	return Loadable(Object.assign({
		loading: () => (<></>),
	}, loader));
}

export function replaceRouteParamProps(text, params = {}) {
	return text.replace(/:(\w+)/g, (_, key) => (params[key] || key));
}
