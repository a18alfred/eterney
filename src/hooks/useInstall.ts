import { MODAL_ROUTE } from '../constants/routing';
import { usePWA } from '../context/pwa/pwa';
import useModal from './useModal';

const useInstall = () => {
	const pwaValues = usePWA();
	const isInstallable = !pwaValues.isInstalled && (pwaValues.promptInstall !== null || pwaValues.isIos);
	const { open } = useModal();

	const install = () => {
		if (pwaValues.isIos) {
			open(MODAL_ROUTE.INSTALL);
		} else {
			try {
				pwaValues?.promptInstall?.prompt();
			} catch (e) {
				console.log(e);
			}
		}
	};

	return { isInstallable, install };
};

export default useInstall;