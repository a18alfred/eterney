import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { isMobileSafari } from 'mobile-device-detect';
import { isInstalled } from '../context/pwa/pwa';

interface WindowDimensions {
	width: number;
	height: number;
}

const getWindowDimensions = (): WindowDimensions => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
};

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			debouncedResize(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const debouncedResize = useCallback(
		debounce(dimensions => {
			if (isInstalled() && isMobileSafari)
				setWindowDimensions({
					width: window.innerWidth,
					height: window.innerHeight
				});
			else
				setWindowDimensions(dimensions);
		}, 250), []
	);

	return windowDimensions;
};

export default useWindowDimensions;
