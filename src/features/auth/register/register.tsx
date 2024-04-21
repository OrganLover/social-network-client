import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { Button, Stack, Title, Tooltip } from '@mantine/core';
import { AuthBlock } from '@entities';
import { validateEmail } from '@shared/utils/validation';
import { IconCard, Input } from '@shared/ui';
import useMainStore from '@shared/hooks/use-main-store';

import Form from '../ui/form';
import { Link } from 'react-router-dom';
import { PiArrowArcRight } from 'react-icons/pi';

const Register = () => {
	const { t: translate } = useTranslation();
	const { user } = useMainStore();

	const t = (key: string, args?: Record<string, any>) =>
		translate(`pages:auth.register-block.${key}`, args);
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
		<AuthBlock>
			<Link to={'/login'}>
				<Tooltip label={t('to-login-block')}>
					<IconCard
						Icon={PiArrowArcRight}
						position='top-right'
						positionOffset={10}
					/>
				</Tooltip>
			</Link>

			<Stack justify={'space-between'} align={'center'} w={'100%'}>
				<Title order={2} fw={'normal'}>
					{t('title')}
				</Title>

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
			</Stack>
		</AuthBlock>
	);
};

export default Register;
