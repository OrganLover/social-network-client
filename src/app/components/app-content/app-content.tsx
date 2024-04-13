import { useEffect, useState } from 'react';
import useMainStore from '@shared/hooks/use-main-store';

import Layout from 'src/app/layouts/layout';
import { LAYOUT } from 'src/app/layouts/layout.constant';

import type { LayoutType } from 'src/app/layouts/layout.interface';

const AppContent = () => {
	const { user } = useMainStore();

	const [layout, setLayout] = useState<LayoutType>(null);

	useEffect(() => {
		const setup = async () => {
			const isAuth = await user.authorize();

			if (!isAuth) {
				setLayout(LAYOUT.AUTH);
				return;
			}

			setLayout(LAYOUT.MAIN);
		};

		setup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Layout layoutType={layout} />;
};

export default AppContent;
