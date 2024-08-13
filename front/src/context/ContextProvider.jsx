import React, { createContext, useEffect, useState } from 'react';

export const PokeContext = createContext();

const ContextProvider = ({ children }) => {
	const [userSession, setUsersSession] = useState(null);

	useEffect(() => {
		setUsersSession({
			email: 'tester@tester.com',
			role: 'customer',
		});
	}, []);

	return (
		<>
			<PokeContext.Provider value={{ userSession }}>
				{children}
			</PokeContext.Provider>
		</>
	);
};

export default ContextProvider;
