import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './authorsCommandBar.scss';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { useNavigate } from 'react-router-dom';
import { deleteAuthor, setCurrentAuthor } from '../services/slices/authors';

const AuthorsCommandBar = () => {
	const currentAuthor = useAppSelector(state => state.authors.currentAuthor);
	const books = useAppSelector(state => state.books.books);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleDeleteClick() {
		if (currentAuthor)
			if (books.filter(book => book.author_id === currentAuthor.id).length === 0) {
				dispatch(deleteAuthor(currentAuthor.id));
				dispatch(setCurrentAuthor(undefined));
			}
			else
				alert('Сначала удалите все книги автора');
	}

	return (
		<div className='authors-command-bar'>
			<div className="authors-command-bar_button active">
				<Tooltip title='Добавить автора'>
					<IconButton
						onClick={() => navigate('/author/new')}
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</div>
			<div className="authors-command-bar_button">
				<Tooltip title='Редактировать автора'>
					<span>
						<IconButton
							onClick={() => navigate(`/author/${currentAuthor?.id}`)}
							disabled={!currentAuthor}
						>
							<EditIcon />
						</IconButton>
					</span>
				</Tooltip>
			</div>
			<div className="authors-command-bar_button">
				<Tooltip title='Удалить автора'>
					<span>
						<IconButton
							onClick={handleDeleteClick}
							disabled={!currentAuthor}
						>
							<DeleteForeverIcon />
						</IconButton>
					</span>
				</Tooltip>
			</div>
		</div>
	);
};

export default AuthorsCommandBar;