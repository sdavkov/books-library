import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { addBook, editBook, IBook } from '../services/slices/books';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './book.scss';
import bookImage from '../assets/book.png';

const Book = () => {
	const params = useParams();
	const navigate = useNavigate();
	const books = useAppSelector(store => store.books.books);
	const authors = useAppSelector(store => store.authors.authors);
	const [book, setBook] = useState<IBook>({
		id: uuidv4(),
		title: '',
		description: '',
		author_id: '',
		image_url: '',
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (params.book_id) {
			const book = books.find(book => book.id === params.book_id);
			if (book)
				setBook(book);
			else
				navigate('/');
		}
	}, [params, books, setBook]);

	const image_url = book.image_url ? book.image_url : bookImage;

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setBook({
			...book,
			[event.target.name]: event.target.value
		});
	}

	const handleAuthorChange = (event: SelectChangeEvent) => {
		setBook({
			...book,
			author_id: event.target.value
		});
	};

	function handleSubmit() {
		if (params.book_id) {
			dispatch(editBook(book));
		}
		else {
			dispatch(addBook(book));
		}
		navigate('/');
	}

	return (
		<div className='book'>
			<div className="book_title">
				<h2>
					Книга - {book.title ? book.title : 'Новая'}
				</h2>
			</div>
			<form className="author_form" onSubmit={handleSubmit}>
				<img src={image_url} alt="" />
				<div className="book_fields">
					<div className="book_field">
						<TextField
							name='title'
							required
							size='small'
							label="Название книги"
							variant="outlined"
							value={book.title}
							onChange={handleChange}
						/>
					</div>
					<div className="book_field">
						<InputLabel id="demo-simple-select-label">Автор</InputLabel>
						<Select
							sx={{ width: '328px' }}
							size='small'
							required
							labelId="demo-simple-select-label"
							value={book.author_id}
							label="Автор"
							onChange={handleAuthorChange}
						>
							{authors.map(author => (
								<MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
							))}
						</Select>
					</div>
					<div className="book_field">
						<TextField
							name='image_url'
							size='small'
							label="Ссылка на изображение"
							variant="outlined"
							value={book.image_url}
							onChange={handleChange}
						/>
					</div>
					<div className="book_field">
						<TextField
							name='description'
							size='small'
							label="Описание"
							variant="outlined"
							value={book.description}
							multiline
							rows={5}
							onChange={handleChange}
						/>
					</div>
					<div className="book_buttons">
						<Button
							variant="contained"
							type='submit'
						>
							Сохранить
						</Button>
						<Button
							variant="outlined"
							onClick={() => navigate('/')}
						>
							Отменить
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Book;