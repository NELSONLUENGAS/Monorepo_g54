import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export function Header() {
	return (
		<Navbar className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link to={'/'}>Home Page</Link>
						<Link to={'/perfil'}>Perfil</Link>
						<Link to={'/dashboard'}>Dashboard</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
