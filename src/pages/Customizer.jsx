import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { downloadCanvasToImage, reader } from '../config/helpers';
import {
	EditorTabs,
	FilterTabs,
	DecalTypes,
	DownloadTab,
} from '../config/constants';
import {
	fadeAnimation,
	popupAnimation,
	slideAnimation,
} from '../config/motion';
import { ColorPicker, CustomButton, FilePicker, Tab } from '../components';

const Customizer = () => {
	const snap = useSnapshot(state);

	const [file, setFile] = useState('');

	const [activeEditorTab, setActiveEditorTab] = useState('');
	const [activeFilterTab, setActiveFilterTab] = useState({
		logoShirt: true,
		stylishShirt: false,
	});

	const generateTabContent = () => {
		switch (activeEditorTab) {
			case 'colorpicker':
				return <ColorPicker />;
			case 'filepicker':
				return <FilePicker file={file} setFile={setFile} readFile={readFile} />;

			default:
				return null;
		}
	};

	const handleActiveFilterTab = (tabName) => {
		switch (tabName) {
			case 'logoShirt':
				state.isLogoTexture = !activeFilterTab[tabName];
				break;
			case 'stylishShirt':
				state.isFullTexture = !activeFilterTab[tabName];
				break;
			default:
				state.isLogoTexture = true;
				state.isFullTexture = false;
		}

		setActiveFilterTab((p) => ({ ...p, [tabName]: !p[tabName] }));
	};

	const handleDecals = (type, result) => {
		const decalType = DecalTypes[type];

		state[decalType.stateProperty] = result;

		if (!activeFilterTab[decalType.filterTab]) {
			handleActiveFilterTab(decalType.filterTab);
		}
	};

	const readFile = (type) => {
		reader(file).then((result) => {
			handleDecals(type, result);
			setActiveEditorTab('');
		});
	};

	const handleOpenPopup = (tabName) => {
		console.log(tabName, activeEditorTab);
		if (tabName === activeEditorTab) {
			return setActiveEditorTab('');
		}

		setActiveEditorTab(tabName);
	};

	return (
		<AnimatePresence>
			{!snap.intro && (
				<>
					<motion.div
						key='custom'
						className='absolute top-0 left-0 z-10'
						{...slideAnimation('left')}
					>
						<div className='flex items-center min-h-screen'>
							<div className='editortabs-container tabs'>
								{EditorTabs.map((tab) => (
									<Tab
										key={tab.name}
										tab={tab}
										handleClick={() => handleOpenPopup(tab.name)}
									/>
								))}
								<AnimatePresence mode='wait'>
									{generateTabContent()}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>

					<motion.div
						className='absolute z-10 top-5 right-5'
						{...fadeAnimation}
					>
						<CustomButton
							type='filled'
							title='Go Back'
							handleClick={() => (state.intro = true)}
							customStyles='w-fit px-5 py-2.5 font-bold text-sm'
						/>
					</motion.div>

					<motion.div
						className='filtertabs-container'
						{...slideAnimation('up')}
					>
						{FilterTabs.map((tab) => (
							<Tab
								key={tab.name}
								tab={tab}
								isFilterTab
								isActiveTab={activeFilterTab[tab.name]}
								handleClick={() => handleActiveFilterTab(tab.name)}
							/>
						))}
					</motion.div>

					<motion.div
						className='absolute bottom-5 right-5 z-10'
						{...slideAnimation('right')}
					>
						<Tab
							key={DownloadTab.name}
							tab={DownloadTab}
							isFilterTab
							handleClick={downloadCanvasToImage}
							downloadTab
						/>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default Customizer;
