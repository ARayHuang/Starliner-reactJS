import React from 'react';
import { Box } from '@chakra-ui/react';
import Snow from '@components/icon/svgs/snow-flake.svg';

function Banner() {
	const _renderBG = count => {
		return [...Array(count)].map((e, i) => {
			return <Snow key={i} className={`droppings droppings--svg droppings-${i}`}/>;
		});
	};

	return (
		<div className="banner">
			<Box className="wall_paper" />
			<Box
				transform="rotate(15deg)"
				position="absolute"
				top="0"
				left="0"
				right="0"
				bottom="0">
				{_renderBG(80)}
			</Box>
		</div>
	);
}

export default Banner;
