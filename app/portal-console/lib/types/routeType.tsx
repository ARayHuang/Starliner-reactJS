import React from 'react';

export type RouteConfigProp = {
	path: string;
	component: React.ComponentType;
	redirectPath?: string;
	exact?: boolean;
	routes?: Array<RouteConfigProp>;
	paramProps?: { [key: string]: string; }
};

export type DefaultRouteProp = {
	Page: React.ComponentType;
	route: RouteConfigProp;
	key: string;
	exact?: boolean;
	path: string;
	redirectPath?: string;
}
