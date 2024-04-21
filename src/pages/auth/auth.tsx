import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginBlock, RegisterBlock } from '@widgets';
import { ThemeToggle } from '@features';

import { Container } from './auth.css';

const AuthPage = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <LoginBlock />,
		},
		{
			path: '/login',
			element: <LoginBlock />,
		},
		{
			path: '/register',
			element: <RegisterBlock />,
		},
	]);

	return (
		<Container>
			<ThemeToggle position='top-right' />

			<RouterProvider router={router} />
		</Container>
	);
};

export default AuthPage;
