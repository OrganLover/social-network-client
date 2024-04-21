import useMainStore from '@shared/hooks/use-main-store';

const MainLayout = () => {
	const { user } = useMainStore();

	return <div onClick={() => user.logout()}>main layout</div>;
};

export default MainLayout;
