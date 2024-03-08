/**
 * @jest-environment jsdom
 */

const chartStorage = require('./chartStorage')

beforeEach(() => {
    // Start each test with a fresh localStorage
    window.localStorage.clear()
});

describe('saveChart function', () => {
    test('should append chart if idx is null', () => {
        // Initialize expected localStorage start/end state
        const input = '[{"name":"chart 1"},{"name":"chart 2"}]'
        const output = '[{"name":"chart 1"},{"name":"chart 2"},{"name":"chart 3"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 3'}, null)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })

    test('should append chart if idx is out of range', () => {
        // Initialize expected localStorage start/end state
        const input = '[{"name":"chart 1"},{"name":"chart 2"}]'
        const output = '[{"name":"chart 1"},{"name":"chart 2"},{"name":"chart 3"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 3'}, 2)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })

    test('should append chart if charts is empty and idx is null', () => {
        // Initialize expected localStorage start/end state
        const input = '[]'
        const output = '[{"name":"chart 1"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 1'}, null)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })

    test('should append chart if charts is empty and idx is out of range', () => {
        // Initialize expected localStorage start/end state
        const input = '[]'
        const output = '[{"name":"chart 1"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 1'}, 2)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })

    test('should replace chart if idx is first chart', () => {
        // Initialize expected localStorage start/end state
        const input = '[{"name":"chart 1"},{"name":"chart 2"}]'
        const output = '[{"name":"chart 3"},{"name":"chart 2"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 3'}, 0)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })

    test('should replace chart if idx is a middle chart', () => {
        // Initialize expected localStorage start/end state
        const input = '[{"name":"chart 1"},{"name":"chart 2"},{"name":"chart 3"}]'
        const output = '[{"name":"chart 1"},{"name":"chart 4"},{"name":"chart 3"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 4'}, 1)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })

    test('should replace chart if idx is last chart', () => {
        // Initialize expected localStorage start/end state
        const input = '[{"name":"chart 1"},{"name":"chart 2"}]'
        const output = '[{"name":"chart 1"},{"name":"chart 3"}]'

        // Initialize localStorage state
        window.localStorage.setItem('savedCharts', input)

        // Save chart
        chartStorage.saveChart({name: 'chart 3'}, 1)

        // Assert chart saved properly
        expect(window.localStorage.getItem('savedCharts')).toBe(output)
    })
})

describe('loadAllSavedCharts function', () => {
})

describe('loadSavedChart function', () => {
})

describe('updateCurrentChartData function', () => {
})

describe('loadCurrentChartData function', () => {
})
