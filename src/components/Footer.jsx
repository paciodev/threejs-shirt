import { AnimatePresence, motion } from 'framer-motion';
import { slideAnimation } from '../config/motion';
import { useSnapshot } from 'valtio';
import state from '../store';

const Footer = () => {
	const snap = useSnapshot(state);
	return (
		<AnimatePresence>
			{snap.intro && (
				<footer className='bottom-0 left-0 w-full grid place-content-center -translate-y-20 pointer-events-none'>
					<motion.div
						className='glassmorphism h-12 flex items-center rounded-lg'
						{...slideAnimation('up')}
					>
						<p className='px-6'>
							App created by{' '}
							<a
								href='https://pacio.dev'
								target='_blank'
								className='text-blue-500 hover:underline pointer-events-auto'
								rel='noopener noreferrer'
							>
								Pacio
							</a>
						</p>
					</motion.div>
				</footer>
			)}
		</AnimatePresence>
	);
};

export default Footer;
