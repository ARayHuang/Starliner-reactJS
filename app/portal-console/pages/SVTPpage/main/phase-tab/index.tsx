import React, { useState, useContext, useEffect } from 'react';
import { Text, HStack, Flex, Box } from '@chakra-ui/react';
import IconButton from 'hp-swt-react-component/dest/esm/components/button-icon';
import Tab from 'hp-swt-react-component/dest/esm/components/tab';
import { AddOutlined, BackupOutlined } from '@components/icon';
import { ModalFooter, ModalHeader } from '@components/modal';
import PropTypes from 'prop-types';
import Block from 'hp-swt-react-component/dest/esm/components/block';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import UploadResult from '../upload-result';
import Pagination from 'hp-swt-react-component/dest/esm/components/pagination';
import { Select } from 'hp-swt-react-component/dest/esm/components/select';
import TestItemTable from '@components/test-item-table';
import {
	SVTPTaskItemStoreContext,
	TemplateItemStoreContext,
} from '@contexts';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import { PaginationSelectedTable } from 'hp-swt-react-component/dest/esm/components/table';
import { API_STATUS } from '@lib/constants/general';

const buttonStyled = {
	'&:active, &.is-active': {
		bg: '#8C96D2',
		color: 'white',
	},
};
const pageSizeOptions = [
	{
		label: '10',
		value: 10,
	},
	{
		label: '20',
		value: 20,
	},
	{
		label: '50',
		value: 50,
	},
];
const itemCategoryOptions = [
	{
		label: 'Acoustic',
		value: 'Acoustic',
	},
	{
		label: 'Communication',
		value: 'Communication',
	},
	{
		label: 'Cosmetic',
		value: 'Cosmetic',
	},
	{
		label: 'Electrical',
		value: 'Electrical',
	},
	{
		label: 'Environmental',
		value: 'Environmental',
	},
	{
		label: 'Mechanical',
		value: 'Mechanical',
	},
	{
		label: 'Regulatory',
		value: 'Regulatory',
	},
	{
		label: 'Thermal',
		value: 'Thermal',
	},
];
const propTypes = {
	project: PropTypes.string,
	phases: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string,
		value: PropTypes.string,
	})),
	onOpenTaskModal: PropTypes.func,
};
const defaultProps = {
	project: '',
	phases: [],
	onOpenTaskModal: () => {},
};

function PhaseTab({
	project,
	phases = [],
	onOpenTaskModal,
}) {
	const {
		fetchTaskItems,
		taskItemPageMetadata,
		taskItems,
		addTestItems,
		addTestItemLoadingStatus,
	} = useContext(SVTPTaskItemStoreContext);
	const {
		fetchUnaddedTemplateItems,
		setUnaddedTemplateItems,
		unaddedTemplateItems,
	} = useContext(TemplateItemStoreContext);
	const [tabIndex, setTabIndex] = useState(0);
	const [category, setCategory] = useState('');
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [isAddingTestItemModalOpen, setIsAddingTestItemModalOpen] = useState(false);
	const activePhase = phases[tabIndex];
	const width = '400';
	const {
		CurrentPage,
		PageSize,
		TotalCount,
	} = taskItemPageMetadata;
	const selectedColumns = [
		{
			Header: 'Item',
			accessor: 'item',
		},
		{
			Header: 'Information',
			accessor: 'information',
		},
		{
			Header: 'Type',
			accessor: 'type',
		},
	];
	const _handleChange = index => {
		setTabIndex(index);
	};
	const _renderEditPhase = () => {
		return <IconButton
			size="md"
			icon={<AddOutlined size={{ w: 6, h: 6 }}/>}
			className="btn--indigo"
			tooltip="Add phase"
			onClick={onOpenTaskModal}
		/>;
	};
	const _handleAddingTestItemsSubmit = async () => {
		const addedTestItems = unaddedTemplateItems.filter(item => item.isSelected);

		await addTestItems(tabList[tabIndex].id, addedTestItems.map(item => item.id));
		setIsAddingTestItemModalOpen(false);
	};
	const _renderModalTitle = () => {
		return <ModalHeader>
			<span className="text--indigo">
				<AddOutlined />
			</span>
			<span>Add Test Items ({project} / {activePhase.value})</span>
		</ModalHeader>;
	};
	const _renderFooter = () => {
		return <ModalFooter>
			<Button
				className="btn--indigo"
				text="Add to Table"
				onClick={_handleAddingTestItemsSubmit}
				styled={{
					mr: 3,
				}}
			/>
			<Button
				variant="outline"
				className="btn--outline--indigo"
				onClick={() => {
					setIsAddingTestItemModalOpen(false);
					setUnaddedTemplateItems([]);
				}}
				text="Cancel"
			/>
		</ModalFooter>;
	};
	const _renderTabPanel = () => {
		return (<section className="card_section">
			<Text fontSize="sm"
				fontWeight="bold"
				textAlign="left"
				className="card_title">Test Items</Text>
			<div className="step">

			</div>
			<Block 	className="background--white card"
				shadowNumber={0}>
				<HStack spacing="8px">
					<Select
						options={itemCategoryOptions}
						placeholder="Category filter"
						value={category}
						onChange={e => {
							_handleChangeCategory(e.target.value);
						}}
						styled={{
							width: '10%',
							minWidth: '160px',
							maxWidth: '220px',
						}}
					/>
					<Button
						icon={<AddOutlined size={{ h: 5, w: 5 }} />}
						className="btn--indigo"
						onClick={() => {
							setIsAddingTestItemModalOpen(true);
						}}
						text="Add Test Items"
					/>
					<Modal isOpen={isAddingTestItemModalOpen}
						size={Modal.SizeEnum.SIZE4xl}
						headerTitle={_renderModalTitle()}
						onRenderFooter={_renderFooter}>
						<PaginationSelectedTable
							columns={selectedColumns}
							dataSource={unaddedTemplateItems}
							hasSelected={true}
							pageSize={10}
							onSelectedChange={data => {
								setUnaddedTemplateItems(data);
							}}
						/>
					</Modal>
					<Button
						className="btn--indigo"
						onClick={() => setIsUploadModalOpen(true)}
						text="Upload Test Result"
						icon={<BackupOutlined size={{ h: 5, w: 5 }}/>}
					/>
					<UploadResult
						product={project}
						phase={activePhase}
						isOpen={isUploadModalOpen}
						onClose={() => setIsUploadModalOpen(false)}
					/>
				</HStack>
				{_renderTable()}
				{_renderPagination()}
			</Block>
		</section>);
	};

	function _handleChangePage(index) {
		if (phases) {
			fetchTaskItems(activePhase.id, { pageNumber: index, pageSize: PageSize, category });
		}
	}

	function _handleChangePageSize(pageSize) {
		if (phases) {
			fetchTaskItems(activePhase.id, { pageNumber: 1, pageSize: pageSize, category });
		}
	}

	function _handleChangeCategory(category) {
		setCategory(category);

		if (phases) {
			fetchTaskItems(activePhase.id, { pageNumber: 1, pageSize: PageSize, category });
		}
	}

	function _renderPagination() {
		if (Object.keys(taskItemPageMetadata).length !== 0) {
			return (
				<Flex
					justifyContent="center"
					alignItems="center"
				>
					<Pagination
						currentPage={CurrentPage}
						totalCount={TotalCount}
						pageSize={PageSize}
						selectedButtonStyled={buttonStyled}
						variant={Pagination.VariantEnums.OUTLINE}
						onPageChange={index => _handleChangePage(index)}
					/>
					<Select
						options={pageSizeOptions}
						value={PageSize}
						onChange={e => {
							_handleChangePageSize(e.target.value);
						}}
						styled={{
							width: '7%',
							minWidth: '70px',
							maxWidth: '100px',
						}}
					/>
				</Flex>
			);
		}
	}

	function _renderTable() {
		return	taskItems.length > 0 ?
			<TestItemTable
				rowData={taskItems}
			/> :
			<Box
				py= {8}
				m={6}
				className="dashed-box"
			>
				<Text
					color="gray.500"
					fontSize="sm"
					mb={2}>
					There's no existing item yet. Add items
				</Text>
				<Button
					icon={<AddOutlined size={{ h: 5, w: 5 }} />}
					className="btn--indigo"
					onClick={() => {}}
					text="Add Test Items"
				/>
			</Box>;
	}

	const tabList = phases.map((phase, index) => {
		let content = null;

		if (index === tabIndex) {
			content = _renderTabPanel();
		}

		return {
			title: phase.value,
			id: phase.id,
			content,
		};
	});

	useEffect(() => {
		if (tabList.length > 0) {
			const phaseId = tabList[tabIndex].id;

			setCategory('');
			fetchTaskItems(phaseId);
		}
	}, [tabIndex]);

	useEffect(() => {
		if (isAddingTestItemModalOpen) {
			fetchUnaddedTemplateItems(tabList[tabIndex].id);
		}
	}, [isAddingTestItemModalOpen]);

	useEffect(() => {
		if (addTestItemLoadingStatus === API_STATUS.COMPLETED) {
			fetchTaskItems(tabList[tabIndex].id);
		}
	}, [addTestItemLoadingStatus]);

	return (
		<Tab
			tabList={tabList}
			onChange={_handleChange}
			endComponent={_renderEditPhase()}
			width={width}
			className="phase_container"
			defaultFocus={tabIndex}
		/>
	);
}

PhaseTab.propTypes = propTypes;
PhaseTab.defaultProps = defaultProps;

export default PhaseTab;
