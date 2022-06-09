import React from 'react';
import './notFound.scss';
import notFoundImg from '../assets/notfound.png';

const NotFound = () => {
	return (
		<div className='not-found'>
			<img src={notFoundImg} />
			<h2>
				Страница не найдена!
			</h2>
		</div>
	);
};

export default NotFound;