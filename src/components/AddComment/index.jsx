import { useState } from 'react'

import styles from './AddComment.module.scss'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useParams } from 'react-router-dom'
import axios from '../../axios'

export const Index = ({ setRerender }) => {
	const [text, setText] = useState('')

	const params = useParams()

	const onSubmit = async () => {
		try {
			const fields = {
				text,
				postId: params.id,
			}

			await axios.post(`/comments`, fields)

			setText('')
		} catch (err) {
			console.warn(err)
			alert('Ошибка при создании комментария')
		}

		setRerender(true)
	}

	return (
		<>
			<div className={styles.root}>
				<Avatar
					classes={{ root: styles.avatar }}
					src='https://mui.com/static/images/avatar/5.jpg'
				/>
				<div className={styles.form}>
					<TextField
						value={text}
						onChange={e => setText(e.target.value)}
						label='Написать комментарий'
						variant='outlined'
						maxRows={10}
						multiline
						fullWidth
					/>
					<Button onClick={onSubmit} variant='contained'>
						Отправить
					</Button>
				</div>
			</div>
		</>
	)
}
