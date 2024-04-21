import { MantineStyleProps, Paper } from '@mantine/core';

import type { AuthBlockProps } from './auth-block.interface';

const styles: MantineStyleProps = {
	w: 400,
	mih: 300,
	p: 25,
	display: 'flex',
};

const AuthBlock = ({ children }: AuthBlockProps) => {
	return (
		<Paper {...styles} shadow='md' pos={'relative'}>
			{children}
		</Paper>
	);
};

export default AuthBlock;
