import { act, renderHook } from '@testing-library/react';
import { useSearchHistory } from '../../src/hooks/useSearchHistory';

describe('useSearchHistory', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('deve adicionar buscas e manter o histórico máximo', () => {
		const { result } = renderHook(() => useSearchHistory());
		act(() => {
			result.current.addSearch('primeira');
			result.current.addSearch('segunda');
			result.current.addSearch('terceira');
			result.current.addSearch('quarta');
			result.current.addSearch('quinta');
			result.current.addSearch('sexta');
		});
		expect(result.current.getHistory()).toEqual(['sexta', 'quinta', 'quarta', 'terceira', 'segunda']);
	});

	it('não deve adicionar buscas duplicadas', () => {
		const { result } = renderHook(() => useSearchHistory());
		act(() => {
			result.current.addSearch('busca');
			result.current.addSearch('busca');
		});
		expect(result.current.getHistory()).toEqual(['busca']);
	});

	it('não deve adicionar buscas com menos de 3 caracteres', () => {
		const { result } = renderHook(() => useSearchHistory());
		act(() => {
			result.current.addSearch('ab');
			result.current.addSearch('abc');
		});
		expect(result.current.getHistory()).toEqual(['abc']);
	});

	it('deve limpar o histórico', () => {
		const { result } = renderHook(() => useSearchHistory());
		act(() => {
			result.current.addSearch('busca');
			result.current.clearHistory();
		});
		expect(result.current.getHistory()).toEqual([]);
	});
});
