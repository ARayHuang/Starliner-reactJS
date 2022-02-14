import React from 'react';
import PropTypes from 'prop-types';
import { Textarea } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import FormControl from 'hp-swt-react-component/dest/esm/components/form-control';

const propTypes = {
	controlProps: PropTypes.shape({
		name: PropTypes.string,
		label: PropTypes.string,
	}),
};

function NotificationTextAreaControl({
	controlProps,
	...rest
}) {
	const { name } = controlProps;
	const [field, { error, touched }] = useField(name);
	const { setFieldValue } = useFormikContext();
	const _setFieldValue = name => e => {
		if (e.target.value === '') {
			setFieldValue(name, []);
			return;
		}

		const emails = e.target.value.split(',').map(email => {
			return { Email: email };
		});

		setFieldValue(name, emails);
	};
	const { value } = field;

	return (
		<FormControl {...controlProps }>
			<Textarea
				{...field}
				value={value.map(m => {
					return m.Email;
				}).join(',')}
				id={name}
				{...rest}
				onChange={_setFieldValue(name)}
				isInvalid={Boolean(error) && touched}
			/>
		</FormControl>
	);
}

NotificationTextAreaControl.propTypes = propTypes;

export default NotificationTextAreaControl;
