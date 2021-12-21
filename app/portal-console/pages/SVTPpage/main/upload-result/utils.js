import React from 'react';
import { UPLOAD_RESULT_ENUM } from '@lib/constants/general';
import { ClearOutlined, CheckOutlined, AnnouncementOutlined } from '@components/icon';

const {
	ERROR,
	COMPLETE,
	WARNING,
	LOADING,
} = UPLOAD_RESULT_ENUM;
const size = { w: 10, h: 10 };

export const iconSettingMap = {
	[ERROR]: { icon: <ClearOutlined size={size}/>, labelColor: 'orangeRed' },
	[COMPLETE]: { icon: <CheckOutlined size={size}/>, labelColor: 'blueGreen' },
	[WARNING]: { icon: <AnnouncementOutlined size={size}/>, labelColor: 'amber' },
	[LOADING]: { class: 'mini-loader', labelColor: 'indigo' },
};
