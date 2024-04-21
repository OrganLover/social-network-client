import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { Button, Stack, Title, Tooltip } from '@mantine/core';
import { AuthBlock } from '@entities';
import { validateEmail } from '@shared/utils/validation';
import { IconCard, Input } from '@shared/ui';
import useMainStore from '@shared/hooks/use-main-store';

import Form from '../ui/form';
import { PiArrowArcLeft } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Login = () => {
	const { t: translate } = useTranslation();
	const { user } = useMainStore();

	const t = (key: string, args?: Record<string, any>) =>
		translate(`pages:auth.login-block.${key}`, args);
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
		<AuthBlock>
			<Link to={'/register'}>
				<Tooltip label={t('to-register-block')}>
					<IconCard
						Icon={PiArrowArcLeft}
						position='top-left'
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
							description={label('password')}
							{...form.getInputProps('password')}
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

export default Login;
