import React, { useState } from 'react';
import Sidebar from 'hp-swt-react-component/dest/esm/components/side-bar';
import PropTypes from 'prop-types';
import UseStylesSideBar from '../../routes/use-style';

const propTypes = {
	onRenderChildren: PropTypes.func,
	onRenderCollapseChildren: PropTypes.func,
};

function AppSidebar({
	onRenderChildren,
	onRenderCollapseChildren,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const style = UseStylesSideBar();

	console.log(style);
	return (
		<Sidebar
			isOpen={isOpen}
			renderChildren={onRenderChildren}
		/>
	);
}

AppSidebar.propTypes = propTypes;

export default AppSidebar;
