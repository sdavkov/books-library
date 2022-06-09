import React, { useEffect } from 'react';
import { useAppDispatch } from '../services/hooks';
import { getAuthorsAsync } from '../services/slices/authors';
import { getBooksAsync } from '../services/slices/books';
import './app.scss';
import { Outlet, Link } from 'react-router-dom';

function App() {

	const dispatch = useAppDispatch();

	// Первоначальная инициализация хранилища
	useEffect(() => {
		if (!sessionStorage.getItem('session_id')) {
			dispatch(getAuthorsAsync());
			dispatch(getBooksAsync());
			sessionStorage.setItem('session_id', 'book');
		}
	}, [dispatch]);


	return (
		<div className='app'>
			<header className='header'>
				<Link to='/'>
					<h1>Книжный каталог</h1>
				</Link>
			</header>
			<Outlet />
			<footer className='footer'>
				Сергей Давков, <time>2022 г.</time>
			</footer>
		</div>
	);
}

export default App;
