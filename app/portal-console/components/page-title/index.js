import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

const propTypes = {
	textList: PropTypes.array,
	isShowLabels: PropTypes.bool,
};
const defaultProps = {
	textList: ['title'],
	isShowLabels: false,
};

function PageTitle({ textList, isShowLabels }) {
	return (
		<>
			{
				textList.map((text = '', index) => {
					return <span
						className={`${isShowLabels ? 'title_tile--' + (index + 1) : ''}`}
						key={index}>
						<Text
							fontSize="xl"
							fontWeight="bold"
							display="inline-block">{text}
						</Text>
					</span>;
				})
			}
		</>);
}

PageTitle.defaultProps = defaultProps;
PageTitle.propTypes = propTypes;

export default PageTitle;
