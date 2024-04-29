import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mantine/core';

import { useForm } from '@mantine/form';
import { validateEmail } from '@shared/utils/validation';
import { Input } from '@shared/ui';
import useMainStore from '@shared/hooks/use-main-store';

import Form from '../form/form';
import { LOGIN_FORM_TRANSLATION_PREFIX } from './login-form.constant';

const LoginForm = () => {
	const { t: translate } = useTranslation();
	const { user } = useMainStore();

	const t = (key: string, args?: Record<string, any>) =>
		translate(`${LOGIN_FORM_TRANSLATION_PREFIX}.${key}`, args);
	const label = (key: string, args?: Record<string, any>) =>
		translate(`pages:auth.common.input-label.${key}`, args);
	const error = (key: string, args?: Record<string, any>) =>
		translate(`errors:auth.${key}`, args);

	const form = useForm({
		clearInputErrorOnChange: true,
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
			email: v => (!validateEmail(v) ? error('invalid-email') : null),
			password: v => (v.length < 8 ? error('invalid-password') : null),
		},
	});

	const handleSubmit = () => {
		const { hasErrors } = form.validate();

		if (!hasErrors) {
			user.login(form.getValues());
		}
	};

	return (
		<>
			<Form form={form}>
				<Stack align='center' maw={300} w={'100%'}>
					<Input
						description={label('email')}
						{...form.getInputProps('email')}
					/>
					<Input
						description={label('password')}
						{...form.getInputProps('password')}
					/>
				</Stack>
			</Form>

			<Button size='md' onClick={handleSubmit}>
				{t('submit-text')}
			</Button>
		</>
	);
};

export default LoginForm;
