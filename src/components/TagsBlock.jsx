import React from 'react'

import TagIcon from '@mui/icons-material/Tag'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

import { Link } from 'react-router-dom'
import { SideBlock } from './SideBlock'

export const TagsBlock = ({ items, isLoading = true }) => {
	return (
		<SideBlock title='Тэги'>
			<List>
				{(isLoading ? [...Array(5)] : items).map((name, i) => (
					<Link
						key={i}
						style={{ textDecoration: 'none', color: 'black' }}
						to={`/tags/${name}`}
					>
						<ListItem key={i} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<TagIcon />
								</ListItemIcon>
								{isLoading ? (
									<Skeleton width={100} />
								) : (
									<ListItemText primary={name} />
								)}
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</SideBlock>
	)
}
