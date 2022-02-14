import React from 'react';

function ProviderManager({
	providers,
	children,
}:{
	providers: JSX.Element[],
	children: React.ReactNode
}) {
	const _renderProvider = (providers, children) => {
		const [provider, ...restProviders] = providers;

		if (provider) {
			return React.cloneElement(
				provider,
				null,
				_renderProvider(restProviders, children),
			);
		}

		return children;
	};

	return _renderProvider(providers, children);
}

export default ProviderManager;
