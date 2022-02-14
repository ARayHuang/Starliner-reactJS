import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import FormControl from 'hp-swt-react-component/dest/esm/components/form-control';
import { InputNumber } from 'hp-swt-react-component/dest/esm/components/input-number';
import { Select } from 'hp-swt-react-component/dest/esm/components/select';
import Button from 'hp-swt-react-component/dest/esm/components/button';
import { HStack, Text } from '@chakra-ui/react';
import { AddOutlined } from '@components/icon';
import cloneDeep from 'lodash/cloneDeep';
import Tag from 'hp-swt-react-component/dest/esm/components/tag';

const propTypes = {
	controlProps: PropTypes.shape({
		name: PropTypes.string,
		label: PropTypes.string,
	}),
};
const phaseOptions = {
	phaseBase: [
		{
			label: 'DB',
			value: 'DB',
		}, {
			label: 'SI',
			value: 'SI',
		}, {
			label: 'PV',
			value: 'PV',
		},
	],
	phaseExtra: [
		{
			label: 'R',
			value: 'R',
		},
	],
};

function PhaseFormControl({
	controlProps,
}) {
	const { name } = controlProps;
	const [field] = useField(name);
	const { value } = field;
	const [pBase, setPBase] = useState();
	const [pStage, setPStage] = useState();
	const [pExtra, setPExtra] = useState();
	const [isDisabled, setIsDisabled] = useState(true);
	const { setFieldValue } = useFormikContext();
	const _setFieldValue = () => {
		const phases = cloneDeep(value);
		const phase = pBase + (pStage ?? '') + (pExtra ?? '');

		if (phase && phases.filter(m => m.phase === phase).length === 0) {
			phases.push({ phase: phase, editable: true });
			setFieldValue(name, phases);
		}
	};
	const _renderPhase = phase => {
		return (<Tag size="lg"
			className="tag tag--indigo"
			variant="outline"
			key={phase.phase}
			text={phase.phase}
			isShowCloseBtn={phase.editable}
			onClick={() => {
				_removePhase(phase);
			}}/>);
	};
	const _removePhase = phase => {
		const phases = cloneDeep(value).filter(item => item.phase !== phase.phase);

		setFieldValue(name, phases);
	};

	useEffect(() => {
		setIsDisabled((pBase === undefined || pBase === ''));
	}, [pBase]);

	return (
		<FormControl {...controlProps }>
			<HStack>
				<Select placeholder="---" options={phaseOptions.phaseBase} value={pBase} onChange={e => {
					setPBase(e.target.value);
				}}/>
				<InputNumber
					placeholder="---"
					min={1}
					max={99}
					step={1}
					isAllowMouseWheel
					value={pStage}
					onChange={setPStage}
					clampValueOnBlur
				/>
				<Select placeholder="---" options={phaseOptions.phaseExtra} value={pExtra} onChange={e => {
					setPExtra(e.target.value);
				}}/>
				<Button
					className="btn--indigo"
					onClick={_setFieldValue}
					isDisabled={isDisabled}
					text="Add Phase"
					icon={<AddOutlined size={{ h: 5, w: 5 }}/>}
					sx={{ width: '400px' }}/>
			</HStack>
			<HStack spacing={6} pt={4} mb="2em">
				{
					(value.length > 0) && <Text
						fontSize="md"
						fontWeight="500">Existing Phases:</Text>
				}
				{
					value ? value.map(item => (_renderPhase(item))) : ''
				}
			</HStack>
		</FormControl>
	);
}

PhaseFormControl.propTypes = propTypes;

export default PhaseFormControl;
