import {
	Button,
	Caption,
	Cell,
	Counter,
	Group,
	Header,
	Link,
	PanelHeaderBack,
	RichCell,
	Separator,
	Spacing,
	Text,
	Title
} from '@vkontakte/vkui'
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { useNewsById } from '../../../services/hooks/useNewsById'
import Loader from '../../../shared/ui/loader/Loader.tsx'
import { Icon24ExternalLinkOutline } from '@vkontakte/icons'
import Comments from '../../comments/components/Comments'
import parse from 'html-react-parser'
import React, { FC } from 'react'
import styles from '../ui/index.module.css'
import { IStory } from '../../../shared/types/types'
import { UseQueryResult } from '@tanstack/react-query/build/modern/index'

const StoryOverview: FC = () => {
	const routeNavigator = useRouteNavigator()
	const { id } = useParams<'id'>()
	const {
		data: currentNews,
		isLoading,
		isSuccess,
		refetch,
		isFetching
	}: {
		data: IStory
		isLoading: boolean
		isSuccess: boolean
		refetch: () => Promise<UseQueryResult>
		isFetching: boolean
	} = useNewsById(id, true)
	return (
		<Group>
			{isLoading && (
				<>
					<PanelHeaderBack onClick={() => routeNavigator.push('/')} />
					<Loader />
				</>
			)}
			{isSuccess && (
				<>
					<PanelHeaderBack onClick={() => routeNavigator.push('/')} />
					<Header size='large' className={styles.wrapText}>
						<Title className={styles.wrapText}>{currentNews.title} </Title>
					</Header>
					<RichCell>
						<div>
							{currentNews.text && (
								<Text className={styles.wrapText}>
									{parse(currentNews.text)}
								</Text>
							)}
							{currentNews.url && (
								<Link
									href={currentNews.url}
									target='_blank'
									className={styles.wrapText}
								>
									{currentNews.url}{' '}
									<Icon24ExternalLinkOutline width={16} height={16} />
								</Link>
							)}
						</div>
						<Caption level='1' className={styles.published}>
							{`Published ${currentNews.time} ago by ${currentNews.by}`}
						</Caption>
						<Spacing size={24} />
						<Group>
							<div className={styles.comments}>
								<Cell
									indicator={
										<Counter mode='primary'>{currentNews.descendants}</Counter>
									}
								>
									Comments
								</Cell>
								<Button onClick={() => refetch()} loading={isFetching}>
									Refresh
								</Button>
							</div>

							<Separator />
							<Spacing size={24}></Spacing>
							{!currentNews.kids && (
								<Caption level='1' className={styles.emptyState}>
									No comments yet
								</Caption>
							)}

							<Comments ids={currentNews?.kids} shift={0} />
						</Group>
					</RichCell>
				</>
			)}
		</Group>
	)
}

export default StoryOverview
