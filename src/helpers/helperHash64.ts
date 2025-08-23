/**
 * Generates a unique base64 hash using current date/time and a random number.
 * @returns Unique base64 string
 * @example
 * generateBase64Id() // returns something like 'MTY5Mjg2NjE2MzU0NS0wLjg2NTg2ODg2ODg4ODg4OA=='
 */
export function generateBase64Id(): string {
	const str = `${Date.now()}-${Math.random()}`;
	return btoa(unescape(encodeURIComponent(str)));
}
