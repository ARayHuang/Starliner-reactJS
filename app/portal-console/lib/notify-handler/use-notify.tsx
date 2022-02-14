import { getTriggerInstance } from '../observable';
import { EVENT_NAME } from '../constants/general';

export const errorNotify = message => {
	const triggerInstance = getTriggerInstance();

	triggerInstance.trigger(EVENT_NAME.ERROR_NOTIFY, message);
};
