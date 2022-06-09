import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthors } from '../api';

export interface IAuthor {
    id: string;
    name: string;
    life_years: string;
    description?: string;
    image_url?: string;
}

export interface IAuthorsState {
    authors: IAuthor[],
    currentAuthor?: IAuthor,
    searchKeyword: string,
    loading: boolean,
}

const initialState: IAuthorsState = {
	authors: [],
	searchKeyword: '',
	loading: false
};

export const getAuthorsAsync = createAsyncThunk(
	'authors/getAuthors',
	fetchAuthors
);

export const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		setCurrentAuthor: (state, action: PayloadAction<string | undefined>) => {
			if (action.payload)
				state.currentAuthor = state.authors.find(author => author.id === action.payload);
			else
				state.currentAuthor = undefined;
		},
		changeSearchKeyword: (state, action: PayloadAction<string>) => {
			state.searchKeyword = action.payload;
		},
		deleteAuthor: (state, action: PayloadAction<string>) => {
			state.authors = state.authors.filter(author => author.id !== action.payload);
		},
		addAuthor: (state, action: PayloadAction<IAuthor>) => {
			state.authors.push(action.payload);
		},
		editAuthor: (state, action: PayloadAction<IAuthor>) => {
			const author = state.authors.find(author => author.id === action.payload.id);
			if (author) {
				author.name = action.payload.name;
				author.description = action.payload.description;
				author.image_url = action.payload.image_url;
				author.life_years = action.payload.life_years;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAuthorsAsync.pending, state => {
			state.loading = true;
		});
		builder.addCase(getAuthorsAsync.fulfilled, (state, action) => {
			state.authors = action.payload;
			state.loading = false;
		});
		builder.addCase(getAuthorsAsync.rejected, state => {
			state.loading = false;
		});
	}
});

export const {
	setCurrentAuthor,
	changeSearchKeyword,
	deleteAuthor,
	addAuthor,
	editAuthor,
} = authorsSlice.actions;

export default authorsSlice.reducer;