import React, { useState } from 'react';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import { MdOutlineEdit } from '../icon';
import { Box, HStack } from '@chakra-ui/react';
import { List } from 'hp-swt-react-component/dest/esm/components/list';
import SetObsModal from './set-obs-modal';
import { v4 as uuidv4 } from 'uuid';
import { ObsTableItemTypes } from '@lib/types/obsTypes';

const prefix = 'SIO';
const obsLinkBase = 'https://si.austin.hp.com/si/?ObjectType=6&Object=';

function ObsTableItem(ObsTableItemProps: ObsTableItemTypes) {
	const { obsList, testResultId } = ObsTableItemProps;
	const [isModalOn, setIsModalOn] = useState<boolean>(false);
	const onCloseModal = () => {
		setIsModalOn(false);
	};

	function renderButton() {
		return (
			<>
				<IconButton onClick={() => {
					setIsModalOn(true);
				}} icon={<MdOutlineEdit size={{ w: 10, h: 5 }} />} className="btn--amber edit-obs-btn" ></IconButton>
				<SetObsModal isOpen={isModalOn} onClose={onCloseModal} obsList={obsList} testResultId={testResultId} />
			</>
		);
	}

	function renderListWithButton() {
		return (
			<HStack borderRadius="lg" spacing="8px" className="obs-list">
				<Box>
					<List>
						{obsList.map(obs => {
							return (
								<li key={`obs-list-item-${uuidv4()}`}>
									<a href={obsLinkBase + obs.value} rel="noreferrer" target="_blank">{`${prefix + obs.value}`}</a>
								</li>
							);
						})}
					</List>
				</Box>
				<Box>
					{renderButton()}
				</Box>
			</HStack>
		);
	}

	return (
		<HStack spacing="8px">
			{obsList.length <= 0 ? renderButton() : renderListWithButton()}
		</HStack>
	);
}

export default ObsTableItem;
