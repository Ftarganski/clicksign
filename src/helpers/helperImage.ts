// src/helpers/helperImage.ts

/**
 * Valida se a string representa uma imagem PNG ou JPG/JPEG (base64 ou url/arquivo)
 */
export function isValidImage(image: string): boolean {
	if (image.startsWith('data:image/png;base64,')) return true;
	if (image.startsWith('data:image/jpeg;base64,') || image.startsWith('data:image/jpg;base64,')) return true;
	return /\.(png|jpg|jpeg)$/i.test(image);
}
