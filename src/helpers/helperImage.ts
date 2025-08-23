/**
 * Checks if the string represents a PNG or JPG/JPEG image (base64 or url/file).
 * @param image - Image string (base64 or url)
 * @returns Returns true if it is a valid PNG, JPG, or JPEG image
 * @example
 * isValidImage('data:image/png;base64,iVBORw0KGgoAAAANS...') // true
 * isValidImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...') // true
 * isValidImage('https://site.com/image.png') // true
 * isValidImage('file.jpg') // true
 * isValidImage('document.pdf') // false
 */
export function isValidImage(image: string): boolean {
	if (image.startsWith('data:image/png;base64,')) return true;
	if (image.startsWith('data:image/jpeg;base64,') || image.startsWith('data:image/jpg;base64,')) return true;
	return /\.(png|jpg|jpeg)$/i.test(image);
}
