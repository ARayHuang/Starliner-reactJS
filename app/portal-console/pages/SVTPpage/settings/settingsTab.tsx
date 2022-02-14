import React, { useState } from 'react';
import Tab from 'hp-swt-react-component/dest/esm/components/tab';
import Leverage from "./leverage"
import DefaultTestItem from "./default-test-item"
import TestReportTemplates from "./test-report-templates"

function SettingsTab() {
	const [tabIndex, setTabIndex] = useState(0);
	const tabList = [
		{ 
			title: 'Manage Test Report Templates',
			content: <TestReportTemplates/>,
		},
		{ 
			title: 'Default Test Items',
			content: <DefaultTestItem/>,
		},
		{ 
			title: 'Leverage Mapping',
			content: <Leverage />,
		},
	];
	const _handleChange = index => {
		setTabIndex(index);
	};

	return (
		<Tab
			tabList={tabList}
			onChange={_handleChange}
			width="100%"
			variant={Tab.VariantEnums.LINE}
			isShowDivider={false}
			className="tab_container"
			defaultFocus={tabIndex}
		/>
	);
}

export default SettingsTab;
