import { useQuery } from '@tanstack/react-query'
import { getNews } from '../api/news.service.ts'
import {
	NEWS_QUERY_LIMIT,
	REFETCH_INTERVAL
} from '../../shared/constants/apiConstants.ts'

export const useNews = () => {
	return useQuery({
		queryKey: ['get news ids'],
		queryFn: () => getNews(NEWS_QUERY_LIMIT),
		select: ({ data }) => data,
		refetchInterval: REFETCH_INTERVAL
	})
}
