import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './routes';
import {
	SVTPLoadingStoreProvider,
	SVTPTaskStoreProvider,
	SVTPTaskItemStoreProvider,
	PreUploadFileStoreProvider,
	SVTPTaskItemTestResultStoreProvider,
	TemplateItemStoreProvider,
	SVTPTaskSupportStoreProvider,
} from '@contexts';
import ProviderManager from '@lib/providers';
import { ObservableProvider, createObservable } from '@lib/observable';
import './styles/layout.styl';
import LoadingPage from './pages/loadingPage';
import NotifyHandler from '@lib/notify-handler/notify-handler';

const observable = createObservable();
const providers = [
	<SVTPLoadingStoreProvider key="SVTPLoadingStoreProvider"/>,
	<ChakraProvider key="ChakraProvider"/>,
	<SVTPTaskStoreProvider key="SVTPTaskStoreProvider"/>,
	<SVTPTaskItemStoreProvider key="SVTPTaskItemStoreProvider"/>,
	<PreUploadFileStoreProvider key="WrappedPreUploadFileStoreProvider"/>,
	<SVTPTaskItemTestResultStoreProvider key="SVTPTaskItemTestResultStoreProvider"/>,
	<TemplateItemStoreProvider key="TemplateItemStoreProvider"/>,
	<SVTPTaskSupportStoreProvider key="SVTPTaskSupportStoreProvider"/>,
];

function App() {
	return (
		<ObservableProvider observable={observable}>
			<ProviderManager
				providers={providers}
			>
				<link rel="shortcut icon" href="./components/icon/favicon.ico"/>
				<LoadingPage />
				<NotifyHandler/>
				<AppRouter/>
			</ProviderManager>
		</ObservableProvider>
	);
}

export default App;
