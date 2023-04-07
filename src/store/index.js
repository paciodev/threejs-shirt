import { proxy } from 'valtio';

const state = proxy({
	intro: true,
	color: '#EFBD48',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './pacio.png',
	fullDecal: './pacio.png',
});

export default state;
