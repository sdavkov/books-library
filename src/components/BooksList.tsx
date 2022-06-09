import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import BookItem from './BookItem';
import BooksCommandBar from './BooksCommandBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CircularProgress from '@mui/material/CircularProgress';
import './booksList.scss';
import BooksSearchBox from './BooksSearchBox';
import { setCurrentBook } from '../services/slices/books';

const BooksList = () => {
	const { 
		books, 
		loading: 
		booksLoading, 
		searchKeyword 
	} = useAppSelector(state => state.books);
	const currentAuthor = useAppSelector(state => state.authors.currentAuthor);
	const currentBook = useAppSelector(state => state.books.currentBook);
	const dispatch = useAppDispatch();

	const showBooks = useMemo(() => {
		let showBooks = books;
		if (currentAuthor)
			showBooks = showBooks.filter(book => book.author_id === currentAuthor.id);
		if (searchKeyword)
			showBooks = showBooks.filter(book => book.title.toUpperCase().includes(searchKeyword.toUpperCase()));
		return showBooks;
	}, [books, currentAuthor, searchKeyword]);

	const handleAuthorItemClick = useCallback((book_id: string | undefined) => {
		if (currentBook && currentBook.id === book_id)
			dispatch(setCurrentBook(undefined));
		else
			dispatch(setCurrentBook(book_id));
	}, [dispatch, currentBook, setCurrentBook]);

	return (
		<div className="books-list">
			<div className="books-list_header">
				<div className="books-list_title">
					<h2>Книги {currentAuthor ? `- ${currentAuthor.name}` : ''}</h2>
				</div>
				<BooksSearchBox />
				<BooksCommandBar />
			</div>
			<div className='books-list_list'>
				{!booksLoading ?
					<List>
						{showBooks.map(book => (
							<ListItem key={book.id} disablePadding>
								<ListItemButton
									selected={currentBook?.id === book.id}
									onClick={() => handleAuthorItemClick(book.id)}
								>
									<BookItem book_id={book.id} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
					:
					<div className='books-list_progress'>
						<CircularProgress />
					</div>
				}
			</div>
		</div>
	);
};

export default BooksList;