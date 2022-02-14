export type APIResponseType<T> = {
	headers?: Record<string, string>;
	data: T;
	paginationMetadataString?: string;
};

export type APIResponseJsonResultType<T> = {
	headers?: Record<string, string>;
	data: {
		$id: string,
		$values: T[]
	}
}

export type APIResponseVoidType = {
	headers: Record<string, string>;
};

export type QueryParamsType = {
	pageNumber?: number;
	pageSize?: number;
}
