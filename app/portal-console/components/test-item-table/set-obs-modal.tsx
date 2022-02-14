import React, { useContext, useState } from 'react';
import { Center, Box, Text } from '@chakra-ui/react';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import ExpandableList, { expandingBehaviorType } from 'hp-swt-react-component/dest/esm/components/expandable-list';
import { Input } from 'hp-swt-react-component/dest/esm/components/input';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import Block from 'hp-swt-react-component/dest/esm/components/block';
import { SVTPTaskItemTestResultStoreContext } from '@contexts';
import { ModalFooter, ModalHeader } from '@components/modal';
import { ObsType } from '@lib/types/obsTypes';
import { AddOutlined, ClearOutlined } from '@components/icon';
import { MdOutlineEdit } from '../icon';

const prefix = 'SIO';
const hintMessages = {
	emptyInput: 'OBS # cannot be empty.',
};

export type ObsModalTypes = {
	isOpen: boolean,
	onClose: () => void,
	obsList: Array<ObsType>,
	testResultId: string,
}

const addBtnOuterBoxStyle = {
	pr: '37px',
	maxWidth: '320px',
	width: '100%',
};
const removeButtonStyle = {
	ml: '5px',
};
const renderAddButton = handleOnClick => {
	return <Box {...addBtnOuterBoxStyle} onClick={handleOnClick}>
		<Block className="add-btn-container" onClick={handleOnClick} variant={Block.VariantType.DASHED} shadowNumber={10}>
			<IconButton icon={<AddOutlined />} variant="outline" className="btn--outline--indigo" />
		</Block>
	</Box>;
};
const renderRemoveButton = handleOnClick => {
	return <IconButton icon={<ClearOutlined />} variant="outline" className="btn--outline--indigo" onClick={handleOnClick} styled={removeButtonStyle} />;
};

function SetObsModal(obsModalProps: ObsModalTypes) {
	const { isOpen, onClose, obsList, testResultId } = obsModalProps;
	const [obsEditingList, setObsEditingList] = useState([...obsList] || []);
	const [showHintMessage, setShowHintMessage] = useState(false);
	const { updateTestResultObsNumbers } = useContext(SVTPTaskItemTestResultStoreContext);
	const _handleSubmitObs = () => {
		const emptyField = obsEditingList.find(obs => obs.value.length <= 0);

		if (emptyField) {
			setShowHintMessage(true);
		} else {
			const obsNumbers = obsEditingList.map(obs => {
				return obs.value;
			});

			updateTestResultObsNumbers(testResultId, obsNumbers);
			onClose();
		}
	};
	const _handleCancel = () => {
		onClose();
		setObsEditingList([...obsList]);
		setShowHintMessage(false);
	};
	const _renderTitle = () => {
		return <ModalHeader>
			<Box className="text--indigo"><MdOutlineEdit size={{ w: 5, h: 5 }} /></Box>
			<Text fontWeight="bold" ml="2">
				Related OBS #
			</Text>
		</ModalHeader>;
	};
	const _renderHintMessage = () => {
		return showHintMessage ? <Box mb={1} className="hint-message text--orangeRed">{hintMessages.emptyInput}</Box> : null;
	};
	const _renderFooter = () => {
		return <ModalFooter>
			<Box className="obs-modal-footer">
				{_renderHintMessage()}
				<Box>
					<Button
						className="btn--indigo"
						text="Save Changes"
						onClick={_handleSubmitObs}
						styled={{
							mr: 3,
						}}
					/>
					<Button
						variant="outline"
						className="btn--outline--indigo"
						onClick={_handleCancel}
						text="Cancel"
					/>
				</Box>
			</Box>
		</ModalFooter>;
	};
	const onRenderDefaultObs = () => {
		return { value: '' };
	};
	const onRenderInput = object => {
		return (<Input prefix={prefix} {...object} />);
	};
	const onChangeHandler = e => {
		const obs = { ...obsEditingList[e.target.getAttribute('index')] };

		obs.value = e.target.value;
		obsEditingList[e.target.getAttribute('index')] = obs;
		setObsEditingList([...obsEditingList]);
	};
	const renderObsEditingList = () => {
		return <ExpandableList
			className="obs-modal-expandable-list"
			data={obsEditingList}
			expandingBehavior={expandingBehaviorType.APPEND}
			onUpdateData={setObsEditingList}
			onChangeHandler={onChangeHandler}
			onRenderDefaultItem={onRenderDefaultObs}
			allowAddOnEnter={true}
			onRenderSubComponent={onRenderInput}
			allowAutoFocus={true}
			onRenderAddButton={renderAddButton}
			onRenderRemoveButton={renderRemoveButton}
		/>;
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={_handleCancel}
			headerTitle={_renderTitle()}
			onRenderFooter={_renderFooter}
			size="3xl"
		>
			<Center mt={5} className="obs-modal-body">
				{renderObsEditingList()}
			</Center>
		</Modal>
	);
}

export default SetObsModal;
