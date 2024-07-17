import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Post } from '../../components/Post'
import { fetchPosts } from '../../redux/slices/posts'

export const TagView = () => {
	const dispatch = useDispatch()
	const { posts } = useSelector(state => state.posts)
	const params = useParams()
	const [postsArray, setPostsArray] = useState([])

	const isPostsLoading = posts.status === 'loading'

	useEffect(() => {
		dispatch(fetchPosts())
	}, [])

	useEffect(() => {
		if (isPostsLoading) return

		let newArr = []

		posts.items.map(item => {
			if (item.tags.includes(params.tagName)) {
				return newArr.push(item)
			}
		})

		setPostsArray(newArr)
	}, [isPostsLoading])

	return (
		<div>
			<div># {params.tagName}</div>

			<Grid container spacing={3}>
				{(isPostsLoading ? [...Array(5)] : postsArray).map((obj, index) =>
					isPostsLoading ? (
						<Grid item xs='auto'>
							<Post key={index} isLoading={true} />
						</Grid>
					) : (
						<Grid item xs='auto'>
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
								commentsCount={3}
								tags={obj.tags}
								isEditable
							/>
						</Grid>
					)
				)}
			</Grid>
		</div>
	)
}
