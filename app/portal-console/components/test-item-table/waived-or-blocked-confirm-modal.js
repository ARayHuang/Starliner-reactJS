import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import { Center } from '@chakra-ui/react';
import { SVTPTaskItemStoreContext } from '@contexts';
import { AnnouncementOutlined } from '@components/icon';
import { ModalFooter, ModalHeader } from '@components/modal';

const propTypes = {
	isOpen: PropTypes.bool,
	testItemId: PropTypes.string,
	waivedOrBlocked: PropTypes.string,
	onClose: PropTypes.func,
};
const defaultProps = {
	isOpen: false,
	testResultId: '',
	waivedOrBlocked: '',
	onClose: () => {},
};

function WaivedOrBlockedConfirmModal({
	isOpen,
	testItemId,
	waivedOrBlocked,
	onClose,
}) {
	const { updateTestItemWaivedOrBlocked } = useContext(SVTPTaskItemStoreContext);
	const _handleUpdate = () => {
		updateTestItemWaivedOrBlocked(testItemId, {
			waivedOrBlocked,
		});

		onClose();
	};
	const _renderTitle = () => {
		return <ModalHeader>
			<span className="text--orangeRed">
				<AnnouncementOutlined />
			</span>
			<span className="text--orangeRed">
				{_renderWord()}
			</span>
			{' '}
			<span> Test Item</span>
		</ModalHeader>;
	};
	const _renderWord = () => {
		return (waivedOrBlocked === 'Waived') ? 'Waive' : 'Block';
	};
	const _renderFooter = () => {
		return <ModalFooter>
			<Button
				className="btn--orangeRed"
				text={_renderWord()}
				onClick={_handleUpdate}
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
					<span>This test item will be showed as
						<span className="text--orangeRed">
							{` ${waivedOrBlocked}`}
						</span>.
					</span>
				</Center>
			</Modal>
		</>
	);
}

WaivedOrBlockedConfirmModal.propTypes = propTypes;
WaivedOrBlockedConfirmModal.defaultProps = defaultProps;

export default WaivedOrBlockedConfirmModal;
