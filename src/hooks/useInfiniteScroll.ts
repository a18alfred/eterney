import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
	isLoading: boolean;
	hasMore: boolean;
	fetchMore: (...args: any[]) => void;
	fetchArgs?: any[];
}

const useInfiniteScroll = ({ isLoading, hasMore, fetchMore, fetchArgs }: InfiniteScrollProps) => {
	const loader = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const handleObserver = async (entries: IntersectionObserverEntry[]) => {
			const target = entries[0];
			if (!isLoading && hasMore && target.isIntersecting) {
				if (fetchArgs)
					await fetchMore(...fetchArgs);
				else
					await fetchMore();
			}
		};

		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: '250px',
			threshold: 0
		});

		if (loader.current) {
			observer.observe(loader.current);
		}

		return () => {
			observer.disconnect();
		};

	}, [hasMore, isLoading, fetchMore]);

	return loader;
};

export default useInfiniteScroll;
