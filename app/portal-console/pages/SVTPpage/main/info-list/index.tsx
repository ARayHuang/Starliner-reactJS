import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

const propTypes = {
	listData: PropTypes.object,
};

function InfoList({ listData }) {
	const omitListData = omit(listData, [
		'id',
		'updatedAt',
		'metaData',
		'taskPDMs',
		'taskODMs',
	]);
	const _renderValue = value => {
		return (<span>{value}</span>);
	};
	const _renderBoxField = (fieldName, fieldValue) => {
		return (
			<Box py="4px"
				p="10px"
				w="150px" key={fieldName}
				className="list_item"
			>
				<Text fontSize="sm"
					fontWeight="500"
				>
					{fieldName}
				</Text>
				{_renderValue(fieldValue)}
			</Box>);
	};

	return (
		<>
			<Flex flexDirection="row"
				alignContent="center"
				flexWrap="wrap"
			>
				{ _renderBoxField('Project', omitListData.projectName)}
				{ _renderBoxField('PlatformType', omitListData.platformType)}
				{ _renderBoxField('Series', omitListData.series)}
				{ _renderBoxField('Generation', omitListData.generation)}
				{ _renderBoxField('ODM', omitListData.odm?.join(','))}
				{ _renderBoxField('PDM', omitListData.pdm?.join(','))}
				{ _renderBoxField('Phase', omitListData.phases?.map(m => m.value).join(','))}
				{ _renderBoxField('NotifyList', omitListData.notifyList?.map(m => m.Email).join(','))}

			</Flex>
		</>
	);
}

InfoList.propTypes = propTypes;

export default InfoList;
