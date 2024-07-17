import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { CommentsBlock } from '../components/CommentsBlock'
import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { fetchComments } from '../redux/slices/comments'
import { fetchPosts, fetchTags } from '../redux/slices/posts'

export const Home = () => {
	const dispatch = useDispatch()
	const userData = useSelector(state => state.auth.data)
	const { posts, tags } = useSelector(state => state.posts)
	const { comments } = useSelector(state => state.comments)
	const [postsArray, setPostsArray] = useState([])
	const [tab, setTab] = useState('new')

	const isPostsLoading = posts.status === 'loading'
	const isTagsLoading = tags.status === 'loading'
	const isCommentLoading = comments.status === 'loading'

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchTags())
		dispatch(fetchComments())
	}, [])

	useEffect(() => {
		if (isPostsLoading) return

		if (tab === 'new') {
			setPostsArray([...posts.items].reverse())
		} else if (tab === 'popular') {
			setPostsArray(
				[...posts.items].sort((a, b) => (a.viewsCount < b.viewsCount ? 1 : -1))
			)
		}
	}, [isPostsLoading, posts.items, tab])

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={tab === 'new' ? 0 : 1}
				aria-label='basic tabs example'
			>
				<Tab label='Новые' onClick={() => setTab('new')} />
				<Tab label='Популярные' onClick={() => setTab('popular')} />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={8} item>
					{(isPostsLoading ? [...Array(5)] : postsArray).map((obj, index) =>
						isPostsLoading ? (
							<Post key={index} isLoading={true} />
						) : (
							<Post
								key={index}
								_id={obj._id}
								title={obj.title}
								imageUrl={
									obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
								}
								user={obj.user}
								createdAt={obj.createdAt}
								viewsCount={obj.viewsCount}
								tags={obj.tags}
								comments={comments.items}
								isEditable={userData?._id === obj.user._id}
							/>
						)
					)}
				</Grid>
				<Grid xs={4} item>
					<TagsBlock items={tags.items} isLoading={isTagsLoading} />
					<CommentsBlock items={comments.items} isLoading={isCommentLoading} />
				</Grid>
			</Grid>
		</>
	)
}
