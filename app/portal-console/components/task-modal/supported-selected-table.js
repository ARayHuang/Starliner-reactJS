import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import { Select } from 'hp-swt-react-component/dest/esm/components/select';
import { Checkbox } from 'hp-swt-react-component/dest/esm/components/check-box';
import { SelectedTable } from 'hp-swt-react-component/dest/esm/components/table';
import { ENUM_CATEGORY } from '@lib/constants/general';
import cloneDeep from 'lodash/cloneDeep';

const categoryOptions = [{ label: 'All', value: 'all' }].concat(Object.values(ENUM_CATEGORY).map(m => ({ label: m, value: m })));
const propTypes = {
	filteredData: PropTypes.array,
	cacheSupportList: PropTypes.array,
	onCategoryChange: PropTypes.func,
	onSelectedChange: PropTypes.func,
};
const defaultProps = {
	filteredData: [],
	cacheSupportList: [],
	onCategoryChange: () => {},
	onSelectedChange: () => {},
};

function SupportedSelectedTable({
	filteredData,
	cacheSupportList,
	onCategoryChange,
	onSelectedChange,
}) {
	const cacheSupportListRef = useRef();

	cacheSupportListRef.current = cacheSupportList;

	const selectedColumns = [
		{
			Header: 'Selected Column',
			accessor: 'isSelected',
			isSelected: true,
			width: '1%',
			Cell: data => {
				const { index } = data.row;
				const values = data.data[index];

				return <Checkbox
					isChecked={values.isSelected}
					onChange={e => _handleSelectedChange(e.target.checked, data)}
				/>;
			},
		},
		{
			Header: 'Item Name',
			accessor: 'feature',
			style: {
				whiteSpace: 'nowrap',
			},
		},
		{
			Header: 'Type',
			accessor: 'featureCategory',
		},
		{
			Header: 'Effected Test Items',
			accessor: 'effectedItems',
			Cell: data => {
				const { row } = data;
				const { values } = row;
				const text = values.effectedItems.join(', \n');

				return <span>{text}</span>;
			},
			style: {
				maxWidth: '50px',
				lineHeight: 'normal',
			},
		},
	];

	function _handleSelectedChange(isChecked, tableData) {
		const { row, data } = tableData;
		const nextData = getSelectedTableChangeSelectData(row, data, isChecked);
		const cloneData = _handleProcessCacheSupportList(nextData);

		onSelectedChange(cloneData);
	}

	function _handleSelectedAll(data) {
		const cloneData = _handleProcessCacheSupportList(data);

		onSelectedChange(cloneData);
	}

	function _handleProcessCacheSupportList(data) {
		const nextData = cloneDeep(cacheSupportListRef.current);

		for (let i = 0; i < data.length; i += 1) {
			const { isSelected, feature } = data[i];
			const row = nextData.find(row => row.feature === feature);

			row.isSelected = isSelected;
		}

		return nextData;
	}

	return (
		<>
			<Box p="1em">
				<Text
					fontSize="md"
					fontWeight="500"
					mb="1em"
				>
					Supported
				</Text>
				<Select
					onChange={e => {
						onCategoryChange(e.target.value);
					}}
					options={categoryOptions}
				/>
			</Box>
			<Box maxHeight="70vh"
				minHeight="500px"
				overflow="auto"
				w="100%"
			>
				<SelectedTable
					columns={selectedColumns}
					dataSource={filteredData}
					hasSelected={false}
					size="sm"
					onSelectedChange={data => _handleSelectedAll(data)}
				/>
			</Box>
		</>
	);
}

SupportedSelectedTable.propTypes = propTypes;
SupportedSelectedTable.defaultProps = defaultProps;

export default SupportedSelectedTable;

function getCheckedStatue(isChecked) {
	if (isChecked) {
		return {
			isAdd: true,
			isDelete: false,
		};
	}

	return {
		isAdd: false,
		isDelete: true,
	};
}

function getCheckedStatusWithPreChecked(preChecked, nextChecked) {
	if (preChecked !== nextChecked) {
		return getCheckedStatue(nextChecked);
	}

	return {
		isAdd: false,
		isDelete: false,
	};
}

function getSelectedTableChangeSelectData(row, data, isChecked) {
	return data.map((item, index) => {
		if (index === row.index && item.isSelected !== undefined) {
			const preChecked = item.isSelectedOrigin;

			item.isSelected = isChecked;
			Object.assign(item, { ...getCheckedStatusWithPreChecked(preChecked, isChecked) });
		}

		return item;
	});
}
