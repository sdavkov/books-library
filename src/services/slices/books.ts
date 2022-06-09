import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks } from '../api';

export interface IBook {
    id: string;
    title: string;
    description?: string;
    author_id: string;
    image_url?: string;
}

export interface IBooksState {
    books: IBook[];
    currentBook?: IBook;
    searchKeyword: string,
    loading: boolean;
}

const initialState: IBooksState = {
	books: [],
	searchKeyword: '',
	loading: false,
};

export const getBooksAsync = createAsyncThunk(
	'authors/getBooks',
	fetchBooks
);

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setCurrentBook: (state, action: PayloadAction<string | undefined>) => {
			if (action.payload)
				state.currentBook = state.books.find(book => book.id === action.payload);
			else
				state.currentBook = undefined;
		},
		changeSearchKeyword: (state, action: PayloadAction<string>) => {
			state.searchKeyword = action.payload;
		},
		deleteBook: (state, action: PayloadAction<string>) => {
			state.books = state.books.filter(book => book.id !== action.payload);
		},
		addBook: (state, action: PayloadAction<IBook>) => {
			state.books.push(action.payload);
		},
		editBook: (state, action: PayloadAction<IBook>) => {
			const book = state.books.find(book => book.id === action.payload.id);
			if (book) {
				book.title = action.payload.title;
				book.description = action.payload.description;
				book.image_url = action.payload.image_url;
				book.author_id = action.payload.author_id;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getBooksAsync.pending, state => {
			state.loading = true;
		});
		builder.addCase(getBooksAsync.fulfilled, (state, action) => {
			state.books = action.payload;
			state.loading = false;
		});
		builder.addCase(getBooksAsync.rejected, state => {
			state.loading = false;
		});
	}
});

export const {
	setCurrentBook,
	changeSearchKeyword,
	deleteBook,
	addBook,
	editBook,
} = booksSlice.actions;

export default booksSlice.reducer;