import React, { useEffect, useState } from 'react';
import './author.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { addAuthor, editAuthor, IAuthor } from '../services/slices/authors';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import profile from '../assets/profile.webp';

const Author = () => {
	const params = useParams();
	const navigate = useNavigate();
	const authors = useAppSelector(store => store.authors.authors);
	const [author, setAuthor] = useState<IAuthor>({
		id: uuidv4(),
		name: '',
		life_years: '',
		description: ''
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (params.author_id) {
			const author = authors.find(author => author.id === params.author_id);
			if (author)
				setAuthor(author);
			else
				navigate('/');
		}
	}, [params, authors, setAuthor]);

	const image_url = author.image_url ? author.image_url : profile;

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setAuthor({
			...author,
			[event.target.name]: event.target.value
		});
	}

	function handleSubmit() {
		if (params.author_id) {
			dispatch(editAuthor(author));
		}
		else {
			dispatch(addAuthor(author));
		}
		navigate('/');
	}

	return (
		<div className='author'>
			<div className="author_title">
				<h2>
          Автор - {author.name ? author.name : 'Новый'}
				</h2>
			</div>
			<form className="author_form" onSubmit={handleSubmit}>
				<img src={image_url} alt="" />
				<div className="author_fields">
					<div className="author_field">
						<TextField
							name='name'
							required
							size='small'
							label="ФИО автора"
							variant="outlined"
							value={author.name}
							onChange={handleChange}
						/>
					</div>
					<div className="author_field">
						<TextField
							name='life_years'
							required
							size='small'
							label="Годы жизни"
							variant="outlined"
							value={author.life_years}
							onChange={handleChange}
						/>
					</div>
					<div className="author_field">
						<TextField
							name='image_url'
							size='small'
							label="Ссылка на изображение"
							variant="outlined"
							value={author.image_url}
							onChange={handleChange}
						/>
					</div>
					<div className="author_field">
						<TextField
							name='description'
							size='small'
							label="Описание"
							variant="outlined"
							value={author.description}
							multiline
							rows={5}
							onChange={handleChange}
						/>
					</div>
					<div className="author_buttons">
						<Button
							variant="contained"
							type='submit'
						>
              Сохранить
						</Button>
						<Button
							variant="outlined"
							onClick={() => navigate('/')}
						>
              Отменить
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Author;