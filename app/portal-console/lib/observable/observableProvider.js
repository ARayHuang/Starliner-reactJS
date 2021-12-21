import React from 'react';

let _observable = {
	subscribe: () => {},
	trigger: () => {},
};
const ObservableContext = React.createContext(_observable);
const ObservableProvider = ({
	observable,
	children,
}) => {
	_observable = observable;

	return (
		<ObservableContext.Provider
			value={_observable}
		>
			{children}
		</ObservableContext.Provider>
	);
};
const defaultMapFunction = () => {
	return {};
};
const connectToObservable = (
	mapTriggerToProps = defaultMapFunction,
	mapSubscribeToProps = defaultMapFunction,
) => {
	if (typeof mapTriggerToProps !== 'function') {
		mapTriggerToProps = defaultMapFunction;
	}

	if (typeof mapSubscribeToProps !== 'function') {
		mapSubscribeToProps = defaultMapFunction;
	}

	return function (WrappedComponent) {
		return props => {
			return (
				<ObservableContext.Consumer>
					{observable => {
						const triggerProps = mapTriggerToProps(observable.trigger);
						const subscribeProps = mapSubscribeToProps(observable.subscribe);

						return (
							<WrappedComponent
								{...props}
								{...triggerProps}
								{...subscribeProps}
							/>
						);
					}}
				</ObservableContext.Consumer>
			);
		};
	};
};
const getTriggerInstance = () => {
	return {
		trigger: (eventName, parameters) => {
			_observable.trigger(eventName, parameters);
		},
	};
};

export {
	ObservableProvider,
	connectToObservable,
	getTriggerInstance,
};
