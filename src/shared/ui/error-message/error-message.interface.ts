import { MantineStyleProps } from '@mantine/core';
import type { CSSProperties, ReactNode } from 'react';

export type ErrorMessageProps = {
  children: ReactNode;
  fontSize?: number;
  fontWeight?: CSSProperties['fontWeight'];
  fontColor?: string;
} & MantineStyleProps;
