import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import Catalog from './pages/Catalog';
import Author from './pages/Author';
import Book from './pages/Book';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />}>
						<Route index element={<Catalog />} />
						<Route path='author/new' element={<Author />} />
						<Route path='author/:author_id' element={<Author />} />
						<Route path='book/new' element={<Book />} />
						<Route path='book/:book_id' element={<Book />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
