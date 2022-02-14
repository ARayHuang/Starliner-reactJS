import React from 'react';
import { Flex, Center, Text } from '@chakra-ui/react';
import TeamCard from './team-card';
import Banner from './banner';

function Home({ onNavigate }) {
	const linkItems = [
		{
			teamName: 'Hardware Team',
			planetCode: 'MARS',
			description: 'Slogan or intro',
			links: ['SVTP', 'report'],
		},
		{
			teamName: 'Machenical Team',
			planetCode: 'VENUS',
			description: 'Slogan or intro',
			links: ['SVTP', 'report'],
		},
		{
			teamName: 'Insight Lab',
			planetCode: 'NEPTUNE',
			description: 'Slogan or intro',
			links: ['SVTP', 'report'],
		},
		{
			teamName: 'Commodity Team',
			planetCode: 'MERCURY',
			description: 'Slogan or intro',
			links: ['SVTP', 'report'],
		},
		{
			teamName: 'BIOS Team',
			planetCode: 'BIOS',
			description: 'Slogan or intro',
			links: ['SVTP', 'report'],
		},
	];
	const _renderTeamCards = () => {
		return linkItems.map((item, i) => {
			return <TeamCard item={item} key={i} onNavigate={onNavigate}/>;
		});
	};

	return (
		<>
			<Banner />
			<Center mt={8}>
				<Text fontSize="5xl" color="#CCC" fontWeight="777">Welcome aboard, Jennifer</Text>
			</Center>
			<Flex flexDirection="row"
				flexWrap="wrap"
				p={10}
			>
				{_renderTeamCards()}
			</Flex>
		</>
	);
}

export default Home;
