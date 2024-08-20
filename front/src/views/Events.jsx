import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PokeContext } from '../context/ContextProvider';

const Events = () => {
	const { dispatchCreateEvent, handleCreateEvent } = useContext(PokeContext);

	return (
		<Form onSubmit={dispatchCreateEvent}>
			<Form.Group
				className="mb-3"
				controlId="formBasicTitle"
			>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter Title"
					name="titulo"
					onChange={handleCreateEvent}
				/>
			</Form.Group>

			<Form.Group
				className="mb-3"
				controlId="formBasicDescription"
			>
				<Form.Label>Description</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter Description"
					name="descripcion"
					onChange={handleCreateEvent}
				/>
			</Form.Group>

			<Form.Group
				className="mb-3"
				controlId="formBasicDate"
			>
				<Form.Label>Date</Form.Label>
				<Form.Control
					type="date"
					placeholder="Enter date"
					name="fecha"
					onChange={handleCreateEvent}
				/>
			</Form.Group>

			<Form.Group
				className="mb-3"
				controlId="formBasicPlace"
			>
				<Form.Label>Place</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter place"
					name="lugar"
					onChange={handleCreateEvent}
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

export default Events;
