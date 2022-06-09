import { IAuthor } from './slices/authors';
import { IBook } from './slices/books';
import { HOST_URL } from './utils';

const authors_url = `${HOST_URL}/data/authors.json`;
const books_url = `${HOST_URL}/data/books.json`;

export async function fetchAuthors() : Promise<IAuthor[]> {
	return await fetch(authors_url)
		.then(res => res.json())
		.then(authors => authors);
}

export async function fetchBooks(): Promise<IBook[]> {
	return await fetch(books_url)
		.then(res => res.json())
		.then(books => books);
}