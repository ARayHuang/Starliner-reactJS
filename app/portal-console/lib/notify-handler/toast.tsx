import { PositionEnum, StatusEnum, VariantEnum } from 'hp-swt-react-component/dest/esm/components/toast';
export const completedToast = (toast, message) => {
	return toast({
		title: 'Completed',
		description: message,
		position: PositionEnum.TOP_RIGHT,
		variant: VariantEnum.SOLID,
		status: StatusEnum.SUCCESS,
		duration: 3000,
		isClosable: true,
	});
};

export const errorToast = (toast, message) => {
	return toast({
		title: 'Error',
		description: message,
		position: PositionEnum.TOP_RIGHT,
		variant: VariantEnum.SOLID,
		status: StatusEnum.ERROR,
		duration: 5000,
		isClosable: true,
	});
};
