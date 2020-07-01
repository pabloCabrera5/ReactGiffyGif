import { renderHook, act } from '@testing-library/react-hooks';
import useForm from './hook';

const initialSetup = (params) => renderHook(() => {
    return useForm(params)
});

test('should change keyword', () => {
    const { result } = initialSetup()
    expect(result.current.keyword).toBe('')
    act(() => result.current.updateKeyword('canarias'))

    expect(result.current.keyword).toBe('canarias')
})

test('should use initial value', () => {
    const { result } = initialSetup({initialKeyword: 'ironman'})
    expect(result.current.keyword).toBe('ironman')
})


test('should update more than once the state', () => {
    const { result } = initialSetup({initialKeyword: 'ironman'});

    act(() => {
        result.current.updateKeyword('canarias')
        result.current.updateKeyword('spain')
    })
    
    expect(result.current.keyword).toBe('spain') 
})