import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './views/Home';
import Perfil from './views/Perfil';
import Dashboard from './views/Dashboard';
import Footer from './components/Footer';
import { Header } from './components/Header';
import RouterGuard from './guard/RouterGuard';
import { useContext } from 'react';
import { PokeContext } from './context/ContextProvider';
import Login from './views/Login';
import Register from './views/Register';
import Events from './views/Events';

function App() {
	const { token } = useContext(PokeContext);
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/events"
					element={<Events />}
				/>

				<Route element={<RouterGuard isAllowed={token ? true : false} />}>
					<Route
						path="/perfil"
						element={<Perfil />}
					/>
					<Route
						path="/dashboard"
						element={<Dashboard />}
					/>
				</Route>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
