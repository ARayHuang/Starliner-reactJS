import React, { useContext } from 'react';
import '../../styles/pages/loadingPage.styl';
import Rocket from '@components/icon/svgs/rocket.svg';
import { Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { SVTPLoadingStoreContext } from '@contexts';

const propTypes = {
	msg: PropTypes.string,
};

function LoadingPage({ msg }) {
	const { isLoading } = useContext(SVTPLoadingStoreContext);
	const _renderLoading = () => {
		return (
			<Flex className="loading_page"
				justifyContent="center">
				<div>
					<div className="loading_wrap">
						<div className="universe"></div>
						<Rocket className="rocket_holder" />
						{[...Array(20)].map((e, i) => {
							return <div key={i} className={`star star-${i}`}></div>;
						})}
					</div>
					<Text mt="60px" color="white">{msg}</Text>
				</div>
			</Flex>
		);
	};

	return (
		<>
			{isLoading ? _renderLoading() : null }
		</>
	);
}

LoadingPage.propTypes = propTypes;

export default LoadingPage;
