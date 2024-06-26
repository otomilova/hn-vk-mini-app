import { useQuery } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import { getItemById } from '../api/items.service.ts'
import { makeDate } from '../../utils/dateUtils'

export const useNewsById = (id: number, refetchOnMount: boolean = false) => {
	return useQuery({
		enabled: !!id,
		queryKey: ['get news overview', id],
		queryFn: () => getItemById(id),
		select: ({ data }) => {
			const itemDate = makeDate(data.time)
			return {
				...data,
				time: formatDistance(itemDate, new Date(), { includeSeconds: true })
			}
		},
		refetchOnMount: refetchOnMount
	})
}
