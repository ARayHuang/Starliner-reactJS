import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Center } from '@chakra-ui/react';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import { SVTPTaskItemStoreContext } from '@contexts';
import { AnnouncementOutlined } from '@components/icon';
import { ModalFooter, ModalHeader } from '@components/modal';

const propTypes = {
	isOpen: PropTypes.bool,
	taskItemId: PropTypes.string.isRequired,
	onClose: PropTypes.func,
};
const defaultProps = {
	isOpen: false,
	taskItemId: '',
	onClose: () => {},
};

function DeleteItemConfirmModal({
	isOpen,
	taskItemId,
	onClose,
}) {
	const { deleteSVTPTaskItem } = useContext(SVTPTaskItemStoreContext);
	const _handleDeleteItem = () => {
		deleteSVTPTaskItem(taskItemId);
		onClose();
	};
	const _renderTitle = () => {
		return <ModalHeader>
			<span className="text--orangeRed">
				<AnnouncementOutlined />
			</span>
			<span>Delete test item</span>
		</ModalHeader>;
	};
	const _renderFooter = () => {
		return <ModalFooter>
			<Button
				className="btn--orangeRed"
				text="Confirm"
				onClick={_handleDeleteItem}
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

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				headerTitle={_renderTitle()}
				onRenderFooter={_renderFooter}
			>
				<Center my={10}>
					<span>This test item will be deleted.
					</span>
				</Center>
			</Modal>
		</>
	);
}

DeleteItemConfirmModal.propTypes = propTypes;
DeleteItemConfirmModal.defaultProps = defaultProps;

export default DeleteItemConfirmModal;
