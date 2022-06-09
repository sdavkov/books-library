import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './booksCommandBar.scss';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { useNavigate } from 'react-router-dom';
import { deleteBook, setCurrentBook } from '../services/slices/books';

const BooksCommandBar = () => {
	const currentBook = useAppSelector(state => state.books.currentBook);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function handleDeleteClick() {
		if (currentBook) {
			dispatch(deleteBook(currentBook.id));
			dispatch(setCurrentBook(undefined));
		}
	}

	return (
		<div className='books-command-bar'>
			<div className="books-command-bar_button active">
				<Tooltip title='Добавить книгу'>
					<IconButton
						onClick={() => navigate('/book/new')}
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</div>
			<div className="books-command-bar_button">
				<Tooltip title='Редактировать книгу'>
					<span>
						<IconButton
							onClick={() => navigate(`/book/${currentBook?.id}`)}
							disabled={!currentBook}
						>
							<EditIcon />
						</IconButton>
					</span>
				</Tooltip>
			</div>
			<div className="books-command-bar_button">
				<Tooltip title='Удалить книгу'>
					<span>
						<IconButton
							onClick={handleDeleteClick}
							disabled={!currentBook}
						>
							<DeleteForeverIcon />
						</IconButton>
					</span>
				</Tooltip>
			</div>
		</div>
	);
};

export default BooksCommandBar;