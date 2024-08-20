import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { handleDecrypt, handleEncrypt } from '../helpers/helpers';
const { VITE_SERVER_URL } = import.meta.env;

export const PokeContext = createContext();

const ContextProvider = ({ children }) => {
	const [userSession, setUsersSession] = useState(null);

	const [token, setToken] = useState(
		localStorage.getItem('token')
			? JSON.parse(handleDecrypt(localStorage.getItem('token')))
			: null
	);

	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const [register, setRegister] = useState({
		email: '',
		password: '',
	});

	const [events, setEvents] = useState({
		titulo: '',
		descripcion: '',
		fecha: '',
		lugar: '',
	});

	useEffect(() => {
		setUsersSession({
			email: 'tester@tester.com',
			role: 'customer',
		});
	}, []);

	const handleCreateLogin = (event) => {
		const { name, value } = event.target;

		setLogin({
			...login,
			[name]: value,
		});
	};

	const handleCreateRegister = (event) => {
		const { name, value } = event.target;

		setRegister({
			...register,
			[name]: value,
		});
	};

	const handleCreateEvent = (event) => {
		const { name, value } = event.target;

		setEvents({
			...events,
			[name]: value,
		});
	};

	const dispatchCreateLogin = async (event) => {
		event.preventDefault();
		const { data } = await axios.post(`${VITE_SERVER_URL}/login`, login);

		console.log(data);
		setToken(data);
		localStorage.setItem('token', handleEncrypt(data));
	};

	const dispatchCreateRegister = async (event) => {
		event.preventDefault();

		const { data } = await axios.post(`${VITE_SERVER_URL}/register`, register);

		console.log(data);
		// setToken(data);
	};

	const dispatchCreateEvent = async (event) => {
		event.preventDefault();

		const { data } = await axios.post(`${VITE_SERVER_URL}/eventos`, events);

		console.log(data);
		// setToken(data);
	};

	return (
		<>
			<PokeContext.Provider
				value={{
					userSession,
					handleCreateEvent,
					handleCreateRegister,
					handleCreateLogin,
					dispatchCreateLogin,
					dispatchCreateRegister,
					dispatchCreateEvent,
					token,
				}}
			>
				{children}
			</PokeContext.Provider>
		</>
	);
};

export default ContextProvider;
