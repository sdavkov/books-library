import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { setCurrentAuthor } from '../services/slices/authors';
import AuthorsCommandBar from './AuthorsCommandBar';
import './authorsList.scss';
import AuthorsSearchBox from './AuthorsSearchBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';

const AuthorsList = () => {
	const {
		authors,
		loading: authorsLoading,
		currentAuthor,
		searchKeyword
	} = useAppSelector(state => state.authors);
	const dispatch = useAppDispatch();

	const handleAuthorItemClick = useCallback((author_id: string | undefined) => {
		if (currentAuthor && currentAuthor.id === author_id)
			dispatch(setCurrentAuthor(undefined));
		else
			dispatch(setCurrentAuthor(author_id));
	}, [dispatch, currentAuthor]);

	const showAuthors = useMemo(() => {
		if (searchKeyword)
			return authors.filter(author => author.name.toUpperCase().includes(searchKeyword.toUpperCase()));
		else
			return authors;
	}, [authors, searchKeyword]);

	return (
		<div className="authors-list">
			<div className="authors-list_title">
				<h2>Авторы</h2>
			</div>
			<AuthorsSearchBox />
			<AuthorsCommandBar />
			{!authorsLoading ?
				<List>
					{showAuthors.map(author => (
						<ListItem key={author.id} disablePadding>
							<ListItemButton
								selected={currentAuthor?.id === author.id}
								onClick={() => handleAuthorItemClick(author.id)}
							>
								<ListItemAvatar>
									<Avatar alt={author.name} src={author.image_url} />
								</ListItemAvatar>
								<ListItemText primary={author.name} secondary={author.life_years} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				:
				<div className='authors-list_progress'>
					<CircularProgress />
				</div>
			}
		</div>
	);
};

export default AuthorsList;