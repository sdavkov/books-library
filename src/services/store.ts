import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorsReducer, { IAuthorsState } from './slices/authors';
import booksReducer, { IBooksState } from './slices/books';

function saveToSessionStorage(state : {authors: IAuthorsState, books: IBooksState}) {
	try {
		const serialisedState = JSON.stringify(state);
		sessionStorage.setItem('persistantState', serialisedState);
	} catch (e) {
		console.warn(e);
	}
}

function loadFromSessionStorage(): {authors: IAuthorsState, books: IBooksState} | undefined {
	try {
		const serialisedState = sessionStorage.getItem('persistantState');
		if (serialisedState === null) return undefined;
		return JSON.parse(serialisedState);
	} catch (e) {
		console.warn(e);
		return undefined;
	}
}

export const store = configureStore({
	reducer: {
		authors: authorsReducer,
		books: booksReducer,
	},
	preloadedState: loadFromSessionStorage()
});

store.subscribe(() => saveToSessionStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
