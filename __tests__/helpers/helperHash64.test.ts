import { generateBase64Id } from '../../src/helpers/helperHash64';

describe('generateBase64Id', () => {
	it('deve gerar um hash base64 único', () => {
		const id1 = generateBase64Id();
		const id2 = generateBase64Id();
		expect(typeof id1).toBe('string');
		expect(typeof id2).toBe('string');
		expect(id1).not.toBe(id2);
		expect(() => atob(id1)).not.toThrow();
		expect(() => atob(id2)).not.toThrow();
	});
});
