const sortPoints = require('./sortPoints')

describe('sortPoints function', () => {
    test('empty list should return empty list', () => {
        expect(sortPoints([])).toStrictEqual([])
    })

    test('list of one point should be returned as is', () => {
        const input = [{x:1, y:2}]

        expect(sortPoints(input)).toStrictEqual(input)
    })

    test('list of identical points should be returned as is', () => {
        const input = [{x:1, y:1}, {x:1, y:1}, {x:1, y:1}]

        expect(sortPoints(input)).toStrictEqual(input)
    })

    test('list with identical x coordinates should be returned as is', () => {
        const input = [{x:1, y:2}, {x:1, y:2}, {x:1, y:3}]

        expect(sortPoints(input)).toStrictEqual(input)
    })

    test('list of points should be sorted by x coordinates', () => {
        const input = [{x:2, y:11}, {x:3, y:12}, {x:1, y:13}]
        const expected_output = [{x:1, y:13}, {x:2, y:11}, {x:3, y:12}]

        expect(sortPoints(input)).toStrictEqual(expected_output)
    })
})
