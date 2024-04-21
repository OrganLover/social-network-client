import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import useMainStore from '@shared/hooks/use-main-store';

import Layout from 'src/app/layouts/layout';
import { LAYOUT } from 'src/app/layouts/layout.constant';

import type { LayoutType } from 'src/app/layouts/layout.interface';

const AppContent = observer(() => {
	const { user } = useMainStore();

	const [layout, setLayout] = useState<LayoutType>(null);

	useEffect(() => {
		const userify = async () => {
			await user.authorize();
		};

		userify();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (user.isAuth === null) {
			return;
		}

		if (user.isAuth) {
			setLayout(LAYOUT.MAIN);
			return;
		}

		setLayout(LAYOUT.AUTH);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.isAuth]);

	return <Layout layoutType={layout} />;
});

export default AppContent;
