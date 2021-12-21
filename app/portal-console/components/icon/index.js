import React from 'react';
import { Icon } from '@chakra-ui/react';
import { MdOutlineCloudUpload as BackupOutlinedM,
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
	MdOutlineLeaderboard as OutlineLeaderboardM } from 'react-icons/md';

function BackupOutlined({ size }) {
	return (<Icon {...size} className="icon" as={BackupOutlinedM} />);
}

function AssignmentOutlined({ size }) {
	return (<Icon {...size} className="icon" as={AssignmentOutlinedM} />);
}

function AddOutlined({ size }) {
	return (<Icon {...size} className="icon" as={AddOutlinedM} />);
}

function DeleteForeverOutlined({ size }) {
	return (<Icon {...size} className="icon" as={DeleteForeverOutlinedM} />);
}

function ClearOutlined({ size }) {
	return (<Icon {...size} className="icon" as={ClearOutlinedM} />);
}

function CheckOutlined({ size }) {
	return (<Icon {...size} className="icon" as={CheckOutlinedM} />);
}

function AnnouncementOutlined({ size }) {
	return (<Icon {...size} className="icon" as={AnnouncementOutlinedM} />);
}

function OutlineDownload({ size }) {
	return (<Icon {...size} className="icon" as={OutlineDownloadM} />);
}

function OutlineEditCalendar({ size }) {
	return (<Icon {...size} className="icon" as={OutlineEditCalendarM} />);
}

function MdInfoOutline({ size }) {
	return (<Icon {...size} className="icon" as={MdInfoOutlineM} />);
}

function OutlineSearch({ size }) {
	return (<Icon {...size} className="icon" as={OutlineSearchM} />);
}

function MdOutlineEdit({ size }) {
	return (<Icon {...size} className="icon" as={MdOutlineEditM} />);
}

function OutlineLeaderboard({ size }) {
	return (<Icon {...size} className="icon" as={OutlineLeaderboardM} />);
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
};

