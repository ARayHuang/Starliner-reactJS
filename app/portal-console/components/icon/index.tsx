import React from 'react';
import { Icon } from '@chakra-ui/react';
import {
	MdOutlineCloudUpload as BackupOutlinedM,
	MdOutlineAssignment as AssignmentOutlinedM,
	MdAdd as AddOutlinedM,
	MdOutlineDeleteForever as DeleteForeverOutlinedM,
	MdClear as ClearOutlinedM,
	MdCheck as CheckOutlinedM,
	MdOutlineAnnouncement as AnnouncementOutlinedM,
	MdOutlineDownload as OutlineDownloadM,
	MdInfoOutline as MdInfoOutlineM,
	MdOutlineEdit as MdOutlineEditM,
	MdOutlineEditCalendar as OutlineEditCalendarM,
	MdOutlineSearch as OutlineSearchM,
	MdRemoveRedEye,
	MdOutlineLeaderboard,
	MdOutlineInsertLink,
	MdOutlineCheck,
	MdOutlineClose,
	MdOutlineAdd,
} from 'react-icons/md';

function BackupOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={BackupOutlinedM} />);
}

function AssignmentOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={AssignmentOutlinedM} />);
}

function AddOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={AddOutlinedM} />);
}

function DeleteForeverOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={DeleteForeverOutlinedM} />);
}

function ClearOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={ClearOutlinedM} />);
}

function CheckOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={CheckOutlinedM} />);
}

function AnnouncementOutlined({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={AnnouncementOutlinedM} />);
}

function OutlineDownload({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={OutlineDownloadM} />);
}

function OutlineEditCalendar({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={OutlineEditCalendarM} />);
}

function MdInfoOutline({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdInfoOutlineM} />);
}

function OutlineSearch({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={OutlineSearchM} />);
}

function MdOutlineEdit({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdOutlineEditM} />);
}

function OutlineLeaderboard({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdOutlineLeaderboard} />);
}

function OutlinedRemoveRedEye({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdRemoveRedEye} />);
}

function OutlineInsertLink({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdOutlineInsertLink} />);
}

function OutlineCheck({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdOutlineCheck} />);
}

function OutlineClose({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdOutlineClose} />);
}

function OutlineAdd({ size }: { size?: object | string }) {
	return (<Icon {...size} className="icon" as={MdOutlineAdd} />);
}

export {
	BackupOutlined,
	AssignmentOutlined,
	AddOutlined,
	DeleteForeverOutlined,
	ClearOutlined,
	CheckOutlined,
	AnnouncementOutlined,
	OutlineDownload,
	OutlineEditCalendar,
	MdInfoOutline,
	MdOutlineEdit,
	OutlineSearch,
	OutlineLeaderboard,
	OutlinedRemoveRedEye,
	OutlineInsertLink,
	OutlineCheck,
	OutlineClose,
	OutlineAdd,
};

