import { ReactNode } from 'react';

/**
 * Highlights the searched term within the text, returning an array of elements (JSX).
 * @param name - Original text
 * @param highlight - Term to be highlighted
 * @returns Text with highlight (JSX)
 * @example
 * getHighlightedName('Project Alpha', 'Pro') // returns <span>Pro</span>ject Alpha
 * getHighlightedName('Maria Souza', 'Sou') // returns Maria <span>Sou</span>za
 */
export function getHighlightedName(name: string, highlight: string): ReactNode {
	if (!highlight || highlight.length < 3) return name;
	const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
	return name.split(regex).map((part, i) =>
		regex.test(part) ? (
			<span key={i} className='text-card font-bold bg-warning'>
				{part}
			</span>
		) : (
			part
		)
	);
}
