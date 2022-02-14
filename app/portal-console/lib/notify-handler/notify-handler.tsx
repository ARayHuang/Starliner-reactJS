import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useToast from 'hp-swt-react-component/dest/esm/components/toast';
import { EVENT_NAME, API_STATUS } from '../constants/general';
import { connectToObservable } from '../observable';
import { usePrevious } from '@lib/general/utils';
import {
	SVTPTaskItemStoreContext,
} from '@contexts';
import { completedToast, errorToast } from './toast';

const {
	COMPLETED,
	LOADING,
} = API_STATUS;
const propTypes = {
	subscribeErrorNotify: PropTypes.func,
};
const defaultProps = {
	subscribeErrorNotify: () => {},
};

function NotifyHandler({
	subscribeErrorNotify,
}) {
	const toast = useToast();
	const {
		addTestItemLoadingStatus,
		updateScheduleLoadingStatus,
		updateWaivedOrBlockedLoadingStatus,
		deleteSVTPTaskItemLoadingStatus,
	} = useContext(SVTPTaskItemStoreContext);
	const prevAddTestItemLoadingStatus = usePrevious(addTestItemLoadingStatus);
	const prevUpdateScheduleLoadingStatus = usePrevious(updateScheduleLoadingStatus);
	const prevUpdateWaivedOrBlockedLoadingStatus = usePrevious(updateWaivedOrBlockedLoadingStatus);
	const prevDeleteSVTPTaskItemLoadingStatus = usePrevious(deleteSVTPTaskItemLoadingStatus);

	useEffect(() => {
		if (prevAddTestItemLoadingStatus === LOADING) {
			if (addTestItemLoadingStatus === COMPLETED) {
				completedToast(toast, 'Test items successfully added to phase.');
			}
		}
	}, [addTestItemLoadingStatus]);

	useEffect(() => {
		if (prevUpdateScheduleLoadingStatus === LOADING) {
			if (updateScheduleLoadingStatus === COMPLETED) {
				completedToast(toast, 'Schedule updated.');
			}
		}
	}, [updateScheduleLoadingStatus]);

	useEffect(() => {
		if (prevUpdateWaivedOrBlockedLoadingStatus === LOADING) {
			if (updateWaivedOrBlockedLoadingStatus === COMPLETED) {
				completedToast(toast, 'Item blocked/waived.');
			}
		}
	}, [updateWaivedOrBlockedLoadingStatus]);

	useEffect(() => {
		if (prevDeleteSVTPTaskItemLoadingStatus === LOADING) {
			if (deleteSVTPTaskItemLoadingStatus === COMPLETED) {
				completedToast(toast, 'Test item deleted.');
			}
		}
	}, [deleteSVTPTaskItemLoadingStatus]);

	useEffect(() => {
		const unsubscribeErrorNotify = subscribeErrorNotify(
			error => errorToast(toast, error.message),
		);

		return () => {
			unsubscribeErrorNotify();
		};
	});

	return (
		<div></div>
	);
}

function mapSubscribeToProps(subscribe) {
	return {
		subscribeErrorNotify: callback => {
			return subscribe(
				EVENT_NAME.ERROR_NOTIFY,
				callback,
			);
		},
	};
}

NotifyHandler.propTypes = propTypes;
NotifyHandler.defaultProps = defaultProps;

export default connectToObservable(
	undefined,
	mapSubscribeToProps,
)(
	NotifyHandler,
);
