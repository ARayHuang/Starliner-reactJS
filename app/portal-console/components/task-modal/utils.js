import * as yup from 'yup';
import isEmail from 'validator/lib/isEmail';

export const userOptions = [
	{
		label: 'jennifer.lin2@hp.com',
		value: 'jenniferId',
	},
	{
		label: 'lisa.chou@hp.com',
		value: 'listId',
	},
	{
		label: 'ray.huang@hp.com',
		value: 'pvId',
	},
];

export const taskValidationSchema = yup.object().shape({
	projectName: yup.string().required('Project is required'),
	generation: yup.string().required('Generation is required'),
	series: yup.string().required('Series is required'),
	platformType: yup.string().required('Platform Type is required'),
	year: yup.string().required('Year is required'),
	odmName: yup.string().required('ODM is required'),
	phases: yup.array().required('Phases is required'),
	odm: yup.array().min(1, 'odm is required'),
	pdm: yup.array().min(1, 'pdm is required'),
	notifyList: yup.array().test('notifyList', 'Email format is incorrect. Use comma(,) to separate emails.', value => {
		return value.filter(notification => isEmail(notification.Email)).length === value.length;
	}),
});
