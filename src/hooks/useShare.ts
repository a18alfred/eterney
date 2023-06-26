import { MouseEvent } from 'react';

interface OnShareProps {
	e: MouseEvent<SVGSVGElement>;
	name: string;
	id: number | string;
}

export const useShare = () => {
	const canShare = !!navigator.share;

	const onShare = async ({ e, name, id }: OnShareProps) => {
		e.preventDefault();
		// let url = document.querySelector('link[rel=canonical]')
		// 	? document.querySelector('link[rel=canonical]').getAttribute('href') + id
		// 	: document.location.href + id;

		try {
			await navigator
				.share({
					title: 'ETERNEY',
					text: name,
					url: document.location.href + id
				});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		canShare,
		onShare
	};
};