import useFontSize from '../../context/font/font';
import { FONT_SIZES } from '../../constants/settings';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import { ToggleModalItem } from './index';
import { ScrollableDiv } from '../../theme/elements';


interface FontMenuProps {
	close: () => void;
}

const FontMenu = ({ close }: FontMenuProps) => {
	const { t } = useTranslation();
	const { size } = useFontSize();
	const sizes = [];

	for (let key in FONT_SIZES) {
		sizes.push(
			<FontMenuItem
				sizeName={t(FONT_SIZES[key].name)}
				sizeKey={key}
				active={size.key === key}
				key={key}
			/>
		);
	}

	return (
		<ScrollableDiv>
			<ToggleModalItem onClick={close}>
				<ChevronLeftIcon style={{ fontSize: 16 }} />
			</ToggleModalItem>
			{sizes}
		</ScrollableDiv>
	);
};

export default FontMenu;

interface FontMenuItemProps {
	sizeName: string;
	sizeKey: string;
	active: boolean;
}

const FontMenuItem = ({ sizeName, sizeKey, active }: FontMenuItemProps) => {
	const { setSize } = useFontSize();
	const changeSize = () => {
		if (active) return null;
		setSize(FONT_SIZES[sizeKey]);
	};

	return (
		<ToggleModalItem onClick={changeSize}>
			<div>{sizeName}</div>
			{active && <CheckIcon style={{ fontSize: 16, opacity: 0.6 }} />}
		</ToggleModalItem>
	);
};