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

//Akshat
describe('loadAllSavedCharts function', () => {
    
    test('returns array of all saved charts', () => {
    
        const chart = {
            type: 'bar',
            data: [{x: 1, y: 2}],
            xLabel: 'x',
            yLabel: 'y',
            title: 'exampleidk',
            color: '#2ab57b'
        }
        const newChart = {
            type: 'line',
            data: [{x: 3, y: 15}],
            xLabel: 'x',
            yLabel: 'y',
            title: 'newChart',
            color: '#b57d2a'
        }


        chartStorage.saveChart(chart)
        chartStorage.saveChart(newChart)

        window.localStorage.getItem('savedCharts', chart)
        window.localStorage.getItem('savedCharts', newChart)

        const result = chartStorage.loadAllSavedCharts()

        expect(result).toStrictEqual([chart, newChart])
    })
    
})

//Akshat
describe('loadSavedChart function', () => {

    test('returns nothing if provided with non created chart', () => {

        const chart = {
            type: 'bar',
            data: [{x: 1, y: 2}],
            xLabel: 'x',
            yLabel: 'y',
            title: 'exampleidk',
            color: '#2ab57b'
        }

        window.localStorage.getItem('savedCharts', chart)

        //save chart
        const result = chartStorage.loadSavedChart()

        expect(result).toEqual({})

    })

    test('returns specific chart from array of charts', () => {

        const chart = {
            type: 'bar',
            data: [{x: 1, y: 2}],
            xLabel: 'x',
            yLabel: 'y',
            title: 'exampleidk',
            color: '#2ab57b'
        }

        window.localStorage.getItem('savedCharts', chart)

        //save chart
        chartStorage.saveChart(chart)
        const result = chartStorage.loadSavedChart()

        expect(result).toEqual({})

    })
    
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
