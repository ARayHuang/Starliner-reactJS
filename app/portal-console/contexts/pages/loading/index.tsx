import React, { Dispatch, SetStateAction, useState } from 'react';
export const SVTPLoadingStoreContext = React.createContext<{
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}>({
	isLoading: false,
	setIsLoading: () => {},
});

export const SVTPLoadingStoreProvider = ({ key, children }: {key: string, children?: React.ReactNode}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	return (
		<SVTPLoadingStoreContext.Provider
			value={{
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</SVTPLoadingStoreContext.Provider>
	);
};
