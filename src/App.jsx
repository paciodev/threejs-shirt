import Canvas from './canvas';
import Footer from './components/Footer';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

const App = () => {
	return (
		<main className='app transition-all ease-in'>
			<Home />
			<Canvas />
			<Customizer />
			<Footer />
		</main>
	);
};

export default App;
