import React from 'react';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { changeSearchKeyword } from '../services/slices/authors';
import TextField from '@mui/material/TextField';
import './authorsSearchBox.scss';

const AuthorsSearchBox = () => {
	const dispatch = useAppDispatch();
	const searchKeyword = useAppSelector(state => state.authors.searchKeyword);

	return (
		<div className="author-search-box">
			<TextField
				size='small'
				label="Поиск по автору"
				variant="outlined"
				value={searchKeyword}
				onChange={(event) => dispatch(changeSearchKeyword(event.target.value))}
			/>
		</div>
	);
};

export default AuthorsSearchBox;