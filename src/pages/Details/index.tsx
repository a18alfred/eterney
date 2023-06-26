import React, { useEffect } from 'react';
import PersonDetails from '../../components/PersonDetails';
import { useHistory } from 'react-router-dom';
import { selectSoulById, selectSoulLoading } from '../../state/soul/slice';
import { SearchLoader } from '../../components/Loader';
import { ModalProps } from '../../state/modal/types';
import { useAppSelector } from '../../state/hooks';

const Details: React.FC<ModalProps> = ({ id }) => {
	const history = useHistory();
	const isLoading = useAppSelector(selectSoulLoading);
	const soul = useAppSelector(state => selectSoulById(state, id));

	useEffect(() => {
		if (!isLoading && !soul)
			history.push('/');
	}, [isLoading]);

	if (id === undefined) return null;

	return (
		<>
			<SearchLoader isLoading={isLoading} soul={soul} nothingMessage={true}>
				{soul && <PersonDetails soul={soul} isMainScreen={true} isPending={false} />}
			</SearchLoader>
		</>
	);
};

export default Details;
