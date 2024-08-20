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
						<Link
							className="px-2"
							to={'/'}
						>
							Home Page
						</Link>
						<Link
							className="px-2"
							to={'/perfil'}
						>
							Perfil
						</Link>
						<Link
							className="px-2"
							to={'/dashboard'}
						>
							Dashboard
						</Link>
						<Link
							className="px-2"
							to={'/login'}
						>
							Login
						</Link>
						<Link
							className="px-2"
							to={'/register'}
						>
							Register
						</Link>
						<Link
							className="px-2"
							to={'/events'}
						>
							Events
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
