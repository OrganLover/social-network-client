import { useTranslation } from 'react-i18next';
import { Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

import { validateEmail } from '@shared/utils/validation';
import { Input } from '@shared/ui';
import useMainStore from '@shared/hooks/use-main-store';

import Form from '../form/form';
import { REGISTRATION_BLOCK_TRANSLATION_PREFIX } from './registration-block.constant';

const RegistrationForm = () => {
	const { t: translate } = useTranslation();
	const { user } = useMainStore();

	const t = (key: string, args?: Record<string, any>) =>
		translate(`${REGISTRATION_BLOCK_TRANSLATION_PREFIX}.${key}`, args);
	const label = (key: string, args?: Record<string, any>) =>
		translate(`pages:auth.common.input-label.${key}`, args);
	const error = (key: string, args?: Record<string, any>) =>
		translate(`errors:auth.${key}`, args);

	const form = useForm({
		clearInputErrorOnChange: true,
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			userName: '',
			password: '',
			passwordConfirm: '',
		},
		validate: {
			email: v => (!validateEmail(v) ? error('invalid-email') : null),
			userName: v => (!v.length ? error('invalid-name') : null),
			password: v => (v.length < 8 ? error('invalid-password') : null),
			passwordConfirm: (v, form) =>
				v !== form.password ? error('invalid-password-confirm') : null,
		},
	});

	const handleSubmit = () => {
		const { hasErrors } = form.validate();

		if (!hasErrors) {
			const { passwordConfirm, ...rest } = form.getValues();
			user.register(rest);
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
						description={label('name')}
						{...form.getInputProps('userName')}
					/>
					<Input
						description={label('password')}
						{...form.getInputProps('password')}
					/>
					<Input
						description={label('password-confirm')}
						{...form.getInputProps('passwordConfirm')}
					/>
				</Stack>
			</Form>

			<Button size='md' onClick={handleSubmit}>
				{t('submit-text')}
			</Button>
		</>
	);
};

export default RegistrationForm;
