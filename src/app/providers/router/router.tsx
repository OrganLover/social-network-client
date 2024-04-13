import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Welcome</div>,
		errorElement: <div>Unknown error</div>,
	},
]);

const Router = () => {
	return <RouterProvider router={router} />;
};

export default Router;
