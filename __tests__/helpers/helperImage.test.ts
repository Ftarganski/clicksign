import { isValidImage } from '../../src/helpers/helperImage';

describe('isValidImage', () => {
	it('deve retornar true para base64 PNG', () => {
		expect(isValidImage('data:image/png;base64,iVBORw0KGgoAAAANS...')).toBe(true);
	});

	it('deve retornar true para base64 JPEG', () => {
		expect(isValidImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...')).toBe(true);
		expect(isValidImage('data:image/jpg;base64,/9j/4AAQSkZJRgABAQ...')).toBe(true);
	});

	it('deve retornar true para url de imagem PNG/JPG/JPEG', () => {
		expect(isValidImage('https://site.com/image.png')).toBe(true);
		expect(isValidImage('file.jpg')).toBe(true);
		expect(isValidImage('foto.JPEG')).toBe(true);
	});

	it('deve retornar false para arquivos não imagem', () => {
		expect(isValidImage('document.pdf')).toBe(false);
		expect(isValidImage('data:application/pdf;base64,JVBERi0xLjQKJ...')).toBe(false);
		expect(isValidImage('imagem.bmp')).toBe(false);
	});
});
