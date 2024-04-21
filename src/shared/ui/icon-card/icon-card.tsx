import { CSSProperties, ForwardedRef, forwardRef, useMemo } from 'react';
import { Paper } from '@mantine/core';

import {
	DEFAULT_OFFSET,
	CONTAINER_PADDING,
	POSITION,
	ICON_SIZE,
} from './icon-card.constant';

import type { IconCardProps } from './icon-card.interface';

const IconCard = forwardRef(
	(
		{
			Icon,
			positionOffset,
			position,
			containerStyles,
			shadow,
			onClick,
		}: IconCardProps,
		ref: ForwardedRef<HTMLDivElement>,
	) => {
		const style: CSSProperties | undefined = useMemo(() => {
			if (!position) {
				return containerStyles;
			}

			const offset = positionOffset ?? DEFAULT_OFFSET;
			const styles: CSSProperties = {
				position: 'absolute',
			};

			switch (position) {
				case POSITION.TOP_RIGHT: {
					styles.top = offset;
					styles.right = offset;

					break;
				}

				case POSITION.BOTTOM_RIGHT: {
					styles.bottom = offset;
					styles.right = offset;

					break;
				}

				case POSITION.BOTTOM_LEFT: {
					styles.bottom = offset;
					styles.left = offset;

					break;
				}

				case POSITION.TOP_LEFT: {
					styles.top = offset;
					styles.left = offset;

					break;
				}
			}

			return { ...styles, ...containerStyles };
		}, [containerStyles, position, positionOffset]);

		return (
			<Paper
				withBorder
				onClick={onClick}
				display={'flex'}
				p={CONTAINER_PADDING}
				style={style}
				shadow={shadow}
				ref={ref}
			>
				<Icon size={ICON_SIZE} />
			</Paper>
		);
	},
);

export default IconCard;
