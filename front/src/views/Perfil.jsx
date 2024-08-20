import React, { useContext } from 'react';
import { PokeContext } from '../context/ContextProvider';

const Perfil = () => {
	const { token } = useContext(PokeContext);

	return <div>Perfil</div>;
};

export default Perfil;
