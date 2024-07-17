import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'
import axios from '../axios'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { Post } from '../components/Post'

export const FullPost = () => {
	const [data, setData] = useState([])
	const [comments, setComments] = useState([])
	const [isLoadingPost, setIsLoadingPost] = useState(true)
	const [isLoadingComments, setIsLoadingComments] = useState(true)
	const [rerender, setRerender] = useState(false)

	const { id } = useParams()

	useEffect(() => {
		axios
			.get(`/posts/${id}`)
			.then(res => {
				setData(res.data)
				setIsLoadingPost(false)
			})
			.catch(err => {
				console.warn(err)
				alert('Ошибка при получении постов')
			})
	}, [])

	useEffect(() => {
		axios
			.get(`/comments/${id}`)
			.then(res => {
				setComments(res.data)
				setIsLoadingComments(false)
			})
			.catch(err => {
				console.warn(err)
				alert('Ошибка при получении комментариев')
			})

		setRerender(false)
	}, [rerender])

	return (
		<>
			{!isLoadingPost ? (
				<Post
					_id={data._id}
					title={data.title}
					imageUrl={
						data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''
					}
					user={data.user}
					createdAt={data.createdAt}
					viewsCount={data.viewsCount}
					tags={data.tags}
					comments={comments}
					isFullPost
				>
					<ReactMarkdown children={data.text} />
				</Post>
			) : (
				<Post isLoading={isLoadingPost} isFullPost />
			)}

			<CommentsBlock items={comments} isLoading={isLoadingComments}>
				{!isLoadingComments && <Index setRerender={setRerender} />}
			</CommentsBlock>
		</>
	)
}
