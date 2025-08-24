/**
 * Formats a date (ISO string or Date) to the pattern '01 de setembro de 2024' (pt-BR locale).
 * @param date - The date to format (ISO string, Date, undefined or null)
 * @returns The formatted date string or an empty string if invalid
 * @example
 * formatDateLong('2024-09-01') // returns '01 de setembro de 2024'
 * formatDateLong(new Date(2024, 8, 1)) // returns '01 de setembro de 2024'
 */
export function formatDateLong(date: string | Date | undefined | null): string {
	if (!date) return '';
	const d = typeof date === 'string' ? new Date(date) : date;
	if (!(d instanceof Date) || isNaN(d.getTime())) return '';
	return d.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
}
