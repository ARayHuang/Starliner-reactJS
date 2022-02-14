import { UPLOAD_RESULT, API_STATUS } from '../constants/general';
import { ItemType } from './svtpTaskItemContextType';

export type FileType = {
	key?: string;
	version?: string;
	project?: string;
	phase?: string;
	item?: string;
	subItem?: string;
	information?: string;
	vendor?: string;
	checkStatus: UPLOAD_RESULT;
	message: string;
	fileName: string;
	file?: File;
};
export type UploadFuncAsyncType = (file: File, resolve: (response: string[]) => void, reject: (response: string[]) => void) => void;

export type PreUploadFileStoreContextType = {
	files: FileType[] | null;
	uploadFileLoadingStatus: API_STATUS;
	setFilesAfterCheck: (files: FileType[]) => void;
	resetFiles: () => void;
	removeFile: (updateFiles: FileType[]) => void;
	uploadTestResultFiles: () => void;
}
