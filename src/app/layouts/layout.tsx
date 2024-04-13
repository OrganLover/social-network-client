import { useMemo } from 'react';

import AuthLayout from './auth/auth';
import MainLayout from './main/main';
import { LAYOUT } from './layout.constant';

import type { LayoutProps } from './layout.interface';

const Layout = ({ layoutType }: LayoutProps) => {
	const layout = useMemo(() => {
		switch (layoutType) {
			case LAYOUT.AUTH: {
				return <AuthLayout />;
			}

			case LAYOUT.MAIN: {
				return <MainLayout />;
			}

			default: {
				return null;
			}
		}
	}, [layoutType]);

	return layout;
};

export default Layout;
