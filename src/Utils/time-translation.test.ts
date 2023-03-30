import { timeConverter } from "./time-translation"

const time = 1680034546
const timeError = 16800345460000

describe('timeConverter', () => {
    test('получение даты', () => {
        expect(timeConverter(time)).toBe('29.03.2023 in 3:15:46')
    })
    test('ошибочная получение даты', () => {
        expect(timeConverter(timeError)).toBe('NaN.NaN.NaN in NaN:NaN:NaN')
    })
})
