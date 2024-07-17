import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchComments = createAsyncThunk(
	'comments/fetchComments',
	async () => {
		const { data } = await axios.get('/comments')
		return data
	}
)

export const fetchRemoveComments = createAsyncThunk(
	'comments/fetchRemoveComments',
	async id => {
		axios.delete(`/comments/${id}`)
	}
)

const initialState = {
	comments: {
		items: [],
		status: 'loading',
	},
}

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchComments.pending]: state => {
			state.comments.items = []
			state.comments.status = 'loading'
		},
		[fetchComments.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'loaded'
		},
		[fetchComments.rejected]: state => {
			state.comments.items = []
			state.comments.status = 'error'
		},

		[fetchRemoveComments.pending]: (state, action) => {
			state.comments.items = state.comments.items.filter(
				obj => obj.postId !== action.meta.arg
			)
		},
		[fetchRemoveComments.rejected]: state => {
			state.comments.status = 'error'
		},
	},
})

export const commentsReducer = commentsSlice.reducer
