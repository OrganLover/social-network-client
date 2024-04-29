import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PiArrowArcLeft } from 'react-icons/pi';
import { Stack, Title, Tooltip } from '@mantine/core';

import { AuthBlock } from '@entities';
import { LoginForm } from '@features';
import { IconCard } from '@shared/ui';

import { LOGIN_FORM_TRANSLATION_PREFIX } from 'src/features/auth/login-form/login-form.constant';

const LoginBlock = () => {
	const { t: translate } = useTranslation();
	const t = (key: string, args?: Record<string, any>) =>
		translate(`${LOGIN_FORM_TRANSLATION_PREFIX}.${key}`, args);

	return (
		<AuthBlock>
			<Link to={'/registration'}>
				<Tooltip label={t('to-registration-block')}>
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

				<LoginForm />
			</Stack>
		</AuthBlock>
	);
};

export default LoginBlock;
