import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PiArrowArcRight } from 'react-icons/pi';
import { Stack, Title, Tooltip } from '@mantine/core';

import { AuthBlock } from '@entities';
import { RegistrationForm } from '@features';
import { IconCard } from '@shared/ui';

import { REGISTRATION_BLOCK_TRANSLATION_PREFIX } from 'src/features/auth/registration-form/registration-block.constant';

const RegistrationBlock = () => {
	const { t: translate } = useTranslation();
	const t = (key: string, args?: Record<string, any>) =>
		translate(`${REGISTRATION_BLOCK_TRANSLATION_PREFIX}.${key}`, args);

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

				<RegistrationForm />
			</Stack>
		</AuthBlock>
	);
};

export default RegistrationBlock;
