import React from 'react';
import AuthorsList from '../components/AuthorsList';
import BooksList from '../components/BooksList';
import './catalog.scss';

const Catalog = () => {
	return (
		<div className='catalog'>
			<AuthorsList />
			<BooksList />
		</div>
	);
};

export default Catalog;