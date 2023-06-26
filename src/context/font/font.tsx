import React, { createContext, useContext, useEffect, useState } from 'react';
import { FONT_SIZES } from '../../constants/settings';
import { FontSize, WithChildren } from '../../constants/types';

interface FontSizeContextProps {
	size: FontSize;
	setSize: React.Dispatch<React.SetStateAction<FontSize>>;
}

const FontContext = createContext<FontSizeContextProps | null>(null);

export default function useFontSize(): FontSizeContextProps {
	const context = useContext(FontContext);
	if (!context) {
		throw new Error('useFontSize must be used within a FontSizeProvider');
	}
	return context;
}
const savedSize = window.localStorage.getItem('eterney_saved_size');

export const FontProvider: React.FC<WithChildren> = ({ children }) => {
	const [size, setSize] = useState<FontSize>(savedSize ? FONT_SIZES[savedSize] : FONT_SIZES.SMALL);

	useEffect(() => {
		window.localStorage.setItem('eterney_saved_size', size.key);
	}, [size]);

	return (
		<FontContext.Provider value={{ size, setSize }}>
			{children}
		</FontContext.Provider>
	);
};