import Footer from '../components/Footer';
import { Header } from '../components/Header';
import { ProductsGrid } from '../components/ProductsGrid';

export const Home = () => {
	console.log(import.meta.env);
	return (
		<>
			<ProductsGrid />
		</>
	);
};
