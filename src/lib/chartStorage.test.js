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

// Matthew
// For referance the updateCurrentChartData operates when the DOM detects a change in chart inputs.
// It then calls it will the new chart data to replace the old chart data
// As this function only replaces currentChartData rather than updating it, testing for "updates" is not actually necessary.
describe('updateCurrentChartData function', () => {
    test('should currentChartData with full data chart to JSON format', () => {
        // Initialize expected localStorage start/end state
        // Input is in JS object format
        const input = {
            data: [{x: "4", y: "4"}, {x: "1", y: "1"}],
            title: "xdd",
            type: "line",
            xLabel: "x",
            yLabel: "y",
            color: "#ff4500"
        }
        // Output is in JSON format
        const output = '{"data":[{"x":"4","y":"4"},{"x":"1","y":"1"}],"title":"xdd","type":"line","xLabel":"x","yLabel":"y","color":"#ff4500"}'

        // Initialize localStorage state
        window.localStorage.setItem('currentChartData', input)

        // Update chart
        chartStorage.updateCurrentChartData(input)

        // Assert chart saved in currentChartData
        expect(window.localStorage.getItem('currentChartData')).toBe(output)
    })   
    test('should update currentChartData with nothing', () => {
        // Initialize expected localStorage start/end state
        // Input is in JS object format
        const input = {}
        // Output is in JSON format
        const output = '{}'

        // Initialize localStorage state
        window.localStorage.setItem('currentChartData', input)

        // Update chart
        chartStorage.updateCurrentChartData(input)

        // Assert chart saved in currentChartData
        expect(window.localStorage.getItem('currentChartData')).toBe(output)
    })   


})

// Matthew
describe('loadCurrentChartData function', () => {
    test('should return a JS object of the current chart in localStorage', () => {

        // Object representation of the input
        const currentChart = {
            data: [{x: "4", y: "4"}, {x: "1", y: "1"}],
            title: "xdd",
            type: "line",
            xLabel: "x",
            yLabel: "y",
            color: "#ff4500"
        }
        // input is in JSON format
        const input = '{"data":[{"x":"4","y":"4"},{"x":"1","y":"1"}],"title":"xdd","type":"line","xLabel":"x","yLabel":"y","color":"#ff4500"}'

        // Initialize localStorage state
        window.localStorage.setItem('currentChartData', input)

        // Load currentChart to result
        const result = chartStorage.loadCurrentChartData()

        // Assert that the result is strictly equal to current chart
        expect(result).toStrictEqual(currentChart)
    })
    test('should return a JS object of the current null chart in localStorage', () => {

        // Object representation of the input
        const currentChart = {}

        // Load currentChart to result
        const result = chartStorage.loadCurrentChartData()

        // Assert that the result is strictly equal to current chart
        expect(result).toStrictEqual(currentChart)
    }) 
})
