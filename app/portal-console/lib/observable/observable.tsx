const observable = () => {
	const eventMap = {};
	const subscribe = (eventName, callback) => {
		if (eventMap[eventName] === undefined) {
			eventMap[eventName] = [];
		}

		eventMap[eventName].push(callback);

		return () => {
			const callbackIndex = eventMap[eventName].indexOf(callback);

			eventMap[eventName].splice(callbackIndex, 1);
		};
	};
	const trigger = (eventName, parameters) => {
		if (Array.isArray(eventMap[eventName])) {
			const callbacks = eventMap[eventName];

			callbacks.map(callback => callback(parameters));
		}
	};

	return {
		subscribe,
		trigger,
	};
};

export const createObservable = () => {
	return observable();
};
