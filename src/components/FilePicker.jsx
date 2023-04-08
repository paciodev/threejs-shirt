import { motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import CustomButton from './CustomButton';
import { popupAnimation } from '../config/motion';
import state from '../store';

const FilePicker = ({ file, setFile, readFile }) => {
	const snap = useSnapshot(state);

	return (
		<>
			{!snap.intro && (
				<motion.div
					key='colorpicker'
					{...popupAnimation}
					className='filepicker-container'
				>
					<div className='flex-1 flex flex-col'>
						<input
							type='file'
							id='file-upload'
							accept='image/*'
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<label htmlFor='file-upload' className='filepicker-label'>
							Upload File
						</label>
						<p className='mt-2 text-gray-500 text-xs truncate'>
							{file === '' ? 'No file selected' : file.name}
						</p>
					</div>

					<div className='mt-4 flex flex-wrap gap-3'>
						<CustomButton
							type='outline'
							title='Logo'
							handleClick={() => readFile('logo')}
							customStles='text-xs'
						/>
						<CustomButton
							type='filled'
							title='Full'
							handleClick={() => readFile('full')}
							customStles='text-xs'
						/>
					</div>
				</motion.div>
			)}
		</>
	);
};

export default FilePicker;
