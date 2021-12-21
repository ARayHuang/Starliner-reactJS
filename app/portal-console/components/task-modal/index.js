import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Center, HStack } from '@chakra-ui/react';
import { MdInfoOutline, MdOutlineEdit, AddOutlined } from '@components/icon';
import { ModalHeader } from '@components/modal';
import { Formik } from 'formik';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import Modal from 'hp-swt-react-component/dest/esm/components/modal';
import { SelectControl, MultiSelectControl } from 'hp-swt-react-component/dest/esm/components/select';
import { InputControl } from 'hp-swt-react-component/dest/esm/components/input';
import cloneDeep from 'lodash/cloneDeep';
import { SVTPTaskStoreContext, SVTPTaskSupportStoreContext } from '@contexts';
import NotificationTextAreaControl from './notification-text-area';
import { isEmptyObject } from '@lib/general/utils';
import PhaseFormControl from './phase-form-control';
import { userOptions, taskValidationSchema } from './utils';
import SupportedSelectedTable from './supported-selected-table';

const propTypes = {
	isOpen: PropTypes.bool,
	onReload: PropTypes.func,
	onClose: PropTypes.func,
	isNew: PropTypes.bool,
	initialValues: PropTypes.shape({
		phases: PropTypes.arrayOf(PropTypes.shape({
			phase: PropTypes.string,
			editable: PropTypes.bool,
		})),
		projectName: PropTypes.string,
		generation: PropTypes.string,
		series: PropTypes.string,
		platformType: PropTypes.string,
		year: PropTypes.string,
		odmName: PropTypes.string,
		odm: PropTypes.arrayOf(PropTypes.string),
		pdm: PropTypes.arrayOf(PropTypes.string),
		notifyList: PropTypes.arrayOf(PropTypes.object),
		pBase: PropTypes.string,
		pStage: PropTypes.string,
		pExtra: PropTypes.string,
	}),
};
const defaultProps = {
	isOpen: false,
	onReload: () => {},
	onClose: () => {},
	isNew: true,
	initialValues: {
		phases: [],
		projectName: '',
		generation: '',
		series: '',
		platformType: '',
		year: '',
		odmName: '',
		odm: [],
		pdm: [],
		notifyList: [],
		pBase: '',
		pStage: '',
		pExtra: '',
		featureIds: [],
	},
};

function TaskModal({
	onReload,
	isNew,
	initialValues,
	isOpen,
	onClose,
}) {
	const cloneInitValues = cloneDeep(initialValues);
	const [formValues, setFormValues] = useState(cloneInitValues);
	const [filteredData, setFilteredData] = useState([]);
	const [cacheSupportList, setCacheSupportList] = useState([]);
	const ref = useRef({ values: initialValues });
	const { projects, createTask, updateTask, isSubmitting, fetchProjects } = useContext(SVTPTaskStoreContext);
	const { fetchSupportList, fetchSupportListByTaskId, setSupportList, supportList } = useContext(SVTPTaskSupportStoreContext);
	const projectOptions = projects.map(project => ({
		label: project.projectName,
		value: project.projectName,
	}));
	const _renderFieldBox = (component, width) => {
		return <Box px="0.5em" py="1em" w={width}>{component}</Box>;
	};
	const _resetFormValues = () => {
		setFormValues(cloneDeep(initialValues));
	};
	const _handleClose = () => {
		_resetFormValues();
		onClose();
		setSupportList([]);
	};
	const _handleSubmit = async values => {
		const saveData = Object.assign(values, { featureIds: cacheSupportList.filter(m => m.isSelected === true).map(m => m.featureId) });

		if (isNew) {
			createTask(saveData);
		} else {
			const { data } = await updateTask(saveData);

			onReload(data.svtpTaskId);
		}

		_handleClose();
	};
	const _renderModalTitle = () => {
		return (
			<ModalHeader>
				<span className="text--indigo">
					{isNew ? <AddOutlined /> : <MdOutlineEdit />}
				</span>
				<span>{isNew ? 'Create Task' : 'Edit Task'}</span>
			</ModalHeader>);
	};
	const _handleCategoryChange = selected => {
		setFilteredData(cacheSupportList.filter(row => {
			return (row.featureCategory === selected) || (selected === 'all');
		}));
	};

	useEffect(() => {
		if (isOpen && supportList.length === 0) {
			if (isNew) {
				fetchSupportList();
				fetchProjects();
			} else {
				fetchSupportListByTaskId(cloneInitValues.id);
			}
		}

		if (supportList.length > 0) {
			setFilteredData(cloneDeep(supportList));
			setCacheSupportList(cloneDeep(supportList));
		}
	}, [supportList.length, isOpen]);

	useEffect(() => {
		if (!isEmptyObject(initialValues) && !isSubmitting) {
			setFormValues(cloneInitValues);
		}
	}, [initialValues]);

	return (
		<>
			<Modal isOpen={isOpen}
				onClose={() => {
					_handleClose();
				}}
				onRenderFooter={() => {}}
				size={Modal.SizeEnum.SIZE6xl}
				headerTitle={_renderModalTitle()}
			>
				<Box>
					<Formik
						enableReinitialize
						innerRef={ref}
						initialValues={formValues}
						onSubmit={_handleSubmit}
						validationSchema={taskValidationSchema}
						onChange={() => {}}
					>
						{({
							handleSubmit,
							setFieldValue,
						}) => (
							<>
								<HStack
									alignItems="strech"
									py={6}
									px={8}
								>
									<Box
										w="46%"
										as="form"
									>
										<Flex
											alignItems="stretch"
											alignContent="center"
											flexWrap="wrap"
										>
											{_renderFieldBox(<SelectControl isDisabled={!isNew} controlProps={{ name: 'projectName', label: 'Project' }}
												placeholder="Select option"
												options={projectOptions}
												onChange={e => {
													const projectName = e.target.value;
													const project = projects.find(x => x.projectName === projectName);

													setFieldValue('projectName', project.projectName, false);
													setFieldValue('generation', project.generation, false);
													setFieldValue('series', project.series, false);
													setFieldValue('platformType', project.platformType, false);
													setFieldValue('year', project.year, false);
													setFieldValue('odmName', project.odmName, false);
												}}/>, '49%')}
											{_renderFieldBox(<InputControl isDisabled controlProps={{ name: 'generation', label: 'Generation' }}/>, '49%')}
											{_renderFieldBox(<InputControl isDisabled controlProps={{ name: 'series', label: 'Series' }}/>, '49%')}
											{_renderFieldBox(<InputControl isDisabled controlProps={{ name: 'platformType', label: 'Platform Type' }}/>, '49%')}
											{_renderFieldBox(<InputControl isDisabled controlProps={{ name: 'year', label: 'Year' }}/>, '49%')}
											{_renderFieldBox(<InputControl isDisabled controlProps={{ name: 'odmName', label: 'ODM' }}/>, '49%')}
											{_renderFieldBox(<hr />, '100%')}
											{_renderFieldBox(<MultiSelectControl
												className="multi_select"
												controlProps={{ name: 'odm', label: 'ODM Owner' }}
												placeholder="Select option"
												options={userOptions}
												shouldValidate={false}
											/>, '49%')
											}
											{_renderFieldBox(<MultiSelectControl
												className="multi_select"
												controlProps={{ name: 'pdm', label: 'PDM Owner' }}
												placeholder="Select option"
												options={userOptions}
												shouldValidate={false}
											/>, '49%')}
											{_renderFieldBox(<NotificationTextAreaControl
												controlProps={{ name: 'notifyList', label: 'Notify List' }} placeholder="use comma(,) to seperate emails, ex: jennifer.lin2@hp.com, ray.huang@iec.com"
											/>, '100%')}

											{_renderFieldBox(<hr />, '100%')}
											<span className="note note--info">
												<MdInfoOutline />
												<span>Select the options and click on "Add Phase" to add more phases</span>
											</span>
											{_renderFieldBox(<PhaseFormControl controlProps={{ name: 'phases', label: 'Phases' }}/>, '100%')}
										</Flex>
									</Box>
									<Box borderLeft="1px solid #eee" p={2}/>
									<Box w="54%">
										<SupportedSelectedTable
											filteredData={filteredData}
											cacheSupportList={cacheSupportList}
											onCategoryChange={_handleCategoryChange}
											onSelectedChange={data => setCacheSupportList(data)}
										/>
									</Box>
								</HStack>
								<Center w="full" pt={6}>
									<Button
										className="btn--indigo"
										isDisabled={isSubmitting}
										text="Submit"
										onClick={handleSubmit}
										styled={{
											isLoading: isSubmitting,
											mr: 3,
										}}
									/>
									<Button
										variant="outline"
										className="btn--outline--indigo"
										onClick={_handleClose}
										text="Cancel"
									/>
								</Center>
							</>
						)}
					</Formik>
				</Box>
			</Modal>
		</>
	);
}

TaskModal.propTypes = propTypes;
TaskModal.defaultProps = defaultProps;

export default TaskModal;
