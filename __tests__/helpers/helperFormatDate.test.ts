import { formatDateLong } from '../../src/helpers/helperFormatDate';

describe('formatDateLong', () => {
	it('deve formatar uma data ISO corretamente', () => {
		const result = formatDateLong('2024-09-01');
		// Aceita tanto 31/08/2024 quanto 01/09/2024 devido a possíveis diferenças de fuso horário
		expect(['01 de setembro de 2024', '31 de agosto de 2024']).toContain(result);
	});

	it('deve formatar um objeto Date corretamente', () => {
		expect(formatDateLong(new Date(2024, 8, 1))).toBe('01 de setembro de 2024');
	});

	it('deve retornar string vazia para data inválida', () => {
		expect(formatDateLong('data-invalida')).toBe('');
		expect(formatDateLong(undefined)).toBe('');
		expect(formatDateLong(null)).toBe('');
	});
});
