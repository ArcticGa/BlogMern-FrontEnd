import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import DeleteIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchRemoveComments } from '../../redux/slices/comments'
import { fetchRemovePosts } from '../../redux/slices/posts'
import { UserInfo } from '../UserInfo'
import styles from './Post.module.scss'
import { PostSkeleton } from './Skeleton'

export const Post = ({
	_id,
	title,
	createdAt,
	imageUrl,
	user,
	viewsCount,
	tags,
	children,
	comments,
	isFullPost,
	isLoading,
	isEditable,
}) => {
	const dispatch = useDispatch()
	const [countComments, setCountComments] = useState(0)

	if (isLoading) {
		return <PostSkeleton />
	}

	const handleCountComments = () => {
		if (comments === undefined) return 0

		let count = 0
		comments.forEach(comment => {
			if (comment.postId === _id) count += 1
		})

		return count
	}

	const onClickRemove = () => {
		if (window.confirm('Действительно удалить пост?')) {
			dispatch(fetchRemovePosts(_id))
			dispatch(fetchRemoveComments(_id))
		}
	}

	return (
		<div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
			{isEditable && (
				<div className={styles.editButtons}>
					<Link to={`/posts/${_id}/edit`}>
						<IconButton color='primary'>
							<EditIcon />
						</IconButton>
					</Link>
					<IconButton onClick={onClickRemove} color='secondary'>
						<DeleteIcon />
					</IconButton>
				</div>
			)}
			{imageUrl && (
				<img
					className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
					src={imageUrl}
					alt={title}
				/>
			)}
			<div className={styles.wrapper}>
				<UserInfo {...user} additionalText={createdAt} />
				<div className={styles.indention}>
					<h2
						className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
					>
						{isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
					</h2>
					<ul className={styles.tags}>
						{tags.map(name => (
							<li key={name}>
								<Link to={`/tags/${name}`}>#{name}</Link>
							</li>
						))}
					</ul>
					{children && <div className={styles.content}>{children}</div>}
					<ul className={styles.postDetails}>
						<li>
							<EyeIcon />
							<span>{viewsCount}</span>
						</li>
						<li>
							<CommentIcon />
							<span>{handleCountComments()}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
