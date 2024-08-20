import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PokeContext } from '../context/ContextProvider';

const Login = () => {
    const { dispatchCreateLogin, handleCreateLogin } = useContext(PokeContext);
    
	return (
		<Form onSubmit={dispatchCreateLogin}>
			<Form.Group
				className="mb-3"
				controlId="formBasicEmail"
			>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					name="email"
					onChange={handleCreateLogin}
				/>
			</Form.Group>

			<Form.Group
				className="mb-3"
				controlId="formBasicPassword"
			>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleCreateLogin}
				/>
			</Form.Group>

			<Button
				variant="primary"
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};

export default Login;
