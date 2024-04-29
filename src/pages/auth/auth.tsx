import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginBlock, RegistrationBlock } from '@widgets';
import { ThemeToggle } from '@features';

import { Container } from './auth.css';
import LangToggle from 'src/features/lang-toggle/lang-toggle';

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
			path: '/registration',
			element: <RegistrationBlock />,
		},
	]);

	return (
		<Container>
			<LangToggle position='top-left' />
			<ThemeToggle position='top-right' />

			<RouterProvider router={router} />
		</Container>
	);
};

export default AuthPage;
