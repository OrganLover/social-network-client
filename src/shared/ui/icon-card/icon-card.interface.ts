import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import type { MantineShadow } from '@mantine/core';

export type Position =
	| 'top-right'
	| 'bottom-right'
	| 'bottom-left'
	| 'top-left';

export type IconCardProps = {
	Icon: IconType;
	containerStyles?: CSSProperties;
	position?: Position;
	shadow?: MantineShadow;
	positionOffset?: number;
	onClick?: VoidFunction;
};
