import { useContext } from 'react';

import MainStoreContext from '../../app/providers/store/context';

const useMainStore = () => {
	return useContext(MainStoreContext);
};

export default useMainStore;
