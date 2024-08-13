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

function App() {
	const { userSession } = useContext(PokeContext);
	return (
		<Router>
			<Header />
			<Routes>
				<Route
					path="/"
					// index
					element={<Home />}
				/>

				<Route
					element={
						<RouterGuard isAllowed={userSession?.role.includes('admin')} />
					}
				>
					<Route
						path="/perfil"
						// index
						element={<Perfil />}
					/>
					<Route
						path="/dashboard"
						// index
						element={<Dashboard />}
					/>
				</Route>
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
