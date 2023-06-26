import React, { MouseEvent, useState } from 'react';
import { useEterney } from '../../hooks/useEterney';
import { useTranslation } from 'react-i18next';
import { Soul } from '../../state/soul/types';
import { selectUserIsAdmin } from '../../state/user/slice';
import { useAppSelector } from '../../state/hooks';
import { DarkButton } from '../../theme/elements';

interface DeleteProps {
	soul: Soul;
	isPending: boolean;
}

const Delete = ({ soul, isPending }: DeleteProps) => {
	const [btnText, setBtnText] = useState(soul.isDeleted ? 'deleted' : 'delete');
	const { deletePerson } = useEterney();
	const { t } = useTranslation();
	const isAdmin = useAppSelector(selectUserIsAdmin);

	const onDelete = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (btnText !== 'delete') return;
		setBtnText('deleting');
		deletePerson({ id: soul.id }).then(() => {
			setBtnText('deleted');
		}).catch(() => {
			setBtnText('error');
		});
	};

	if (!isAdmin || isPending) return null;

	return (
		<DarkButton onClick={onDelete}>
			{t(btnText)}
		</DarkButton>
	);
};

export default Delete;
