import React, { useContext, useEffect, useState } from 'react';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import { Input } from 'hp-swt-react-component/dest/esm/components/input';
import SingleDatePicker from 'hp-swt-react-component/dest/esm/components/date-picker';
import Note from '../note';
import { ModalFooter, ModalHeader } from '../modal';
import PropTypes from 'prop-types';
import { SVTPTaskItemStoreContext } from '@contexts';
import { OutlineEditCalendar } from '../icon';
import { checkIsValidDate, checkRangeDatePickerIsValid } from '@lib/general/date-utils';
import { formatISO } from 'date-fns';
import {
	Box,
	HStack,
	Center,
} from '@chakra-ui/react';

const propTypes = {
	isOpen: PropTypes.bool,
	testItemId: PropTypes.string,
	initialStartAt: PropTypes.string,
	initialEndAt: PropTypes.string,
	onClose: PropTypes.func,
};
const defaultProps = {
	isOpen: false,
	testResultId: '',
	initialStartAt: '',
	initialEndAt: '',
	onClose: () => {},
};
const dateFormat = 'YYYY/MM/DD';

function TestResultScheduleModal({
	isOpen,
	testItemId,
	initialStartAt,
	initialEndAt,
	onClose,
}) {
	const [startAt, setStartAt] = useState(undefined);
	const [endAt, setEndAt] = useState(undefined);
	const [isGreyOutBtn, setIsGreyOutBtn] = useState(false);
	const { updateTestItemSchedule } = useContext(SVTPTaskItemStoreContext);
	const _setStartDate = selectedDate => {
		setStartAt(selectedDate);
	};
	const _setEndDate = selectedDate => {
		setEndAt(selectedDate);
	};
	const _updateSchedule = () => {
		const startAtFormat = checkIsValidDate(startAt) ? formatISO(new Date(startAt), { format: 'extended' }) : '';
		const endAtFormat = checkIsValidDate(endAt) ? formatISO(new Date(endAt), { format: 'extended' }) : '';

		updateTestItemSchedule(testItemId, {
			startAt: startAtFormat ? startAtFormat : null,
			endAt: endAtFormat ? endAtFormat : null,
		});

		onClose();
	};
	const _renderWarning = () => {
		const startAtFormat = checkIsValidDate(startAt) ? formatISO(new Date(startAt), { format: 'extended' }) : '';
		const endAtFormat = checkIsValidDate(endAt) ? formatISO(new Date(endAt), { format: 'extended' }) : '';

		if (!checkRangeDatePickerIsValid(startAtFormat, endAtFormat)) {
			if (!isGreyOutBtn) {
				setIsGreyOutBtn(true);
			}

			return <Note
				type={Note.TypeEnum.ERROR}
				text="Invalid: please select valid date range."/>;
		}

		if (startAtFormat === '' && endAtFormat === '') {
			return <Note
				type={Note.TypeEnum.INFO}
				text="Fill up start time & end time"/>;
		}

		if (isGreyOutBtn) {
			setIsGreyOutBtn(false);
		}
	};
	const _renderModalTitle = () => {
		return <ModalHeader>
			<span className="text--indigo">
				<OutlineEditCalendar />
			</span>
			<span>Set Date Range</span>
		</ModalHeader>;
	};
	const _onRenderFooter = () => {
		return <ModalFooter>
			<Button
				className="btn--indigo"
				text="Update"
				isDisabled={isGreyOutBtn}
				onClick={_updateSchedule}
				styled={{
					mr: 3,
				}}
			/>
			<Button
				variant="outline"
				className="btn--outline--indigo"
				onClick={onClose}
				text="Cancel"
			/>
		</ModalFooter>;
	};

	useEffect(() => {
		_setStartDate(initialStartAt);
	}, [initialStartAt, isOpen]);

	useEffect(() => {
		_setEndDate(initialEndAt);
	}, [initialEndAt, isOpen]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				className="download-table"
				onClose={onClose}
				size={Modal.SizeEnum.SIZE6xl}
				headerTitle={_renderModalTitle()}
				onRenderFooter={_onRenderFooter}
			>
				{_renderWarning()}
				<HStack justifyContent="center"
					flexWrap="wrap"
					py="1em">
					<Box>
						<label>From</label>
						<Input
							value={startAt}
							onChange={e => _setStartDate(e.target.value)}
							placeholder={dateFormat}
							sx={{ my: '10px' }}/>
						<SingleDatePicker date={startAt}
							onChange={_setStartDate}/>
					</Box>
					<Box>
						<label>To</label>
						<Input
							value={endAt}
							onChange={e => _setEndDate(e.target.value)}
							placeholder={dateFormat}
							sx={{ my: '10px' }}/>
						<SingleDatePicker date={endAt}
							onChange={_setEndDate}/>
					</Box>
				</HStack>
			</Modal>
		</>
	);
}

TestResultScheduleModal.propTypes = propTypes;
TestResultScheduleModal.defaultProps = defaultProps;

export default TestResultScheduleModal;

