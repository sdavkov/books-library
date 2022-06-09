import React from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { changeSearchKeyword } from '../services/slices/books';
import TextField from '@mui/material/TextField';
import './booksSearchBox.scss';

const BooksSearchBox = () => {
	const dispatch = useAppDispatch();
	const searchKeyword = useAppSelector(state => state.books.searchKeyword);
    
	return (
		<div className='books-search-box'>
			<TextField
				size='small'
				label="Поиск по наименованию книги"
				variant="outlined"
				value={searchKeyword}
				onChange={(event) => dispatch(changeSearchKeyword(event.target.value))}
			/>
		</div>
	);
};

export default BooksSearchBox;