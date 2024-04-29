import { Form } from '@mantine/form';

import type { CSSProperties } from 'react';

type FormProps = Parameters<typeof Form>[0];

const styles: CSSProperties = {
	width: '100%',
	height: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const AuthForm = (props: FormProps) => {
	return (
		<Form form={props.form} style={styles}>
			{props.children}
		</Form>
	);
};

export default AuthForm;
