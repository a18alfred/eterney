import React from 'react';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll';
import { useAppSelector } from '../../../../state/hooks';
import { selectUserHasMore, selectUserLoading } from '../../../../state/user/slice';
import { useEterney } from '../../../../hooks/useEterney';
import { Loader } from '../../../../components/Loader';
import styled from 'styled-components';

const LoaderElement = styled.li`
  width: 100%;
`;


const AccountInfiniteLoader = React.memo(() => {
	const isLoading = useAppSelector(selectUserLoading);
	const hasMore = useAppSelector(selectUserHasMore);
	const { fetchSubmissions } = useEterney();
	const loader = useInfiniteScroll({
		isLoading,
		hasMore,
		fetchMore: fetchSubmissions
	});
	return (
		<LoaderElement ref={loader}>
			{hasMore && <Loader extraTopMargin={true} />}
		</LoaderElement>
	);
});

export default AccountInfiniteLoader;
