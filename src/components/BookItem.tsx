import React, { FC, useMemo } from 'react';
import { useAppSelector } from '../services/hooks';
import bookImage from '../assets/book.png';
import './bookItem.scss';

interface IBookItemProps {
    book_id: string;
}

const BookItem: FC<IBookItemProps> = ({ book_id }) => {

	const books = useAppSelector(state => state.books.books);
	const authors = useAppSelector(state => state.authors.authors);

	const book = useMemo(() => {
		return books.find(book => book.id === book_id);
	}, [books]);

	const author = useMemo(() => {
		return book ? authors.find(author => author.id === book.author_id) : undefined;
	}, [authors, book]);

	const image_url = book && book.image_url ? book.image_url : bookImage;

	return (
		book && author ? (
			<div className='book-item'>
				<div className='book-item_img'>
					<img src={image_url} alt={book.title} />
				</div>
				<div className="book-item_info">
					<div className='book-item_author'>
						{author.name}
					</div>
					<div className='book-item_title'>
						{book.title}
					</div>
					<div className="book-item_description">
						{book.description}
					</div>
				</div>
			</div>
		) : (
			<div>Не найдено</div>
		)
	);
};

export default BookItem;