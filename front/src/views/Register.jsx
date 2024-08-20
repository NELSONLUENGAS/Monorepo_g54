import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PokeContext } from '../context/ContextProvider';

const Register = () => {
	const { handleCreateRegister, dispatchCreateRegister } =
		useContext(PokeContext);

	return (
		<Form onSubmit={dispatchCreateRegister}>
			<Form.Group
				className="mb-3"
				controlId="formBasicEmail"
			>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter email"
					name="email"
					onChange={handleCreateRegister}
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
					onChange={handleCreateRegister}
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

export default Register;
