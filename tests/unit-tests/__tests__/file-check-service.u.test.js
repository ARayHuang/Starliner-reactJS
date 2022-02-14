import { useFileCheckService } from '@services/use-file-check-service';
import React from 'react';

let invokeCheckFile;
let resultFiles = [];
const DefaultFileName = 'defaultFileName';
const DefaultFileSize = 1;

describe('check file service', () => {
	beforeEach(() => {
		resultFiles = [];

		React.useCallback = () => {
			return jest.fn().mockImplementation(files => {
				resultFiles = [...files];
			});
		};

		React.useContext = () => {
			return jest.fn().mockImplementation(() => ({
				files: [],
				task: {
					project: '',
					phase: '',
				},
			}))();
		};

		initCheckFileService();
	});

	test('file exceeds 25M should throw error', () => {
		const file = givenFileWithSize(ofMB(26));

		invokeCheckFile(file);

		errorMessageShouldBe(`File size exceed 25MB: ${file.name}`);
	});

	test('invalid file extension should throw error', () => {
		const file = givenFileWithName('SVTP_AC02.txt');

		invokeCheckFile(file);

		errorMessageShouldBe(`File extension only accept ['.xls', '.xlsx']: ${file.name}`);
	});

	test('duplicate file should throw error', () => {
		givenExistingFiles([
			{ fileName: 'SVTP800_AC01.xlsx' },
			{ fileName: 'SVTP800_AC02.xlsx' },
		]);

		const file = givenFileWithName('SVTP800_AC02.xlsx');

		invokeCheckFile(file);

		errorMessageShouldBe(`Duplicate file: ${file.name}`);
	});

	test('project does not match should throw error', () => {
		givenTask('Prima 14', 'DB');

		const file = givenFileWithName('SVTP800_Prima 15_DB_AC02_Intel.xlsx');

		invokeCheckFile(file);

		errorMessageShouldBe('Invalid project: It should be Prima 14, got Prima 15 instead.');
	});

	test('phase does not match should throw error', () => {
		givenTask('Prima 14', 'DB');

		const file = givenFileWithName('SVTP800_Prima 14_PV_AC02_Intel.xlsx');

		invokeCheckFile(file);

		errorMessageShouldBe('Invalid phase: It should be DB, got PV instead.');
	});
	test('item does not exist in the task should throw error', () => {
		givenTask('Prima 14', 'DB', { AC01: 'AC01', AC03: 'AC03' });

		const file = givenFileWithName('SVTP800_Prima 14_DB_AC02_Intel.xlsx');

		invokeCheckFile(file);

		errorMessageShouldBe('Invalid item: no match AC02');
	});

	function givenFileWithSize(size) {
		return {
			size: size,
			name: DefaultFileName,
		};
	}

	function ofMB(size) {
		return size * 1024 * 1024;
	}

	function givenFileWithName(fileName) {
		return {
			size: DefaultFileSize,
			name: fileName,
		};
	}

	function errorMessageShouldBe(message) {
		expect(resultFiles[resultFiles.length - 1].message).toBe(message);
	}

	function initCheckFileService() {
		const { checkFile } = useFileCheckService();

		invokeCheckFile = checkFile;
	}

	function givenExistingFiles(files) {
		React.useContext = () => {
			return jest.fn().mockImplementation(() => ({
				files: files,
			}))();
		};

		initCheckFileService();
	}

	function givenTask(project, phase, items = []) {
		React.useContext = () => {
			return jest.fn().mockImplementation(() => ({
				files: [],
				items: items,
				task: {
					project: project,
					phase: phase,
				},
			}))();
		};

		initCheckFileService();
	}
});
