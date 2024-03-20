/**
 * @jest-environment jsdom
 */


const { waitFor } = require('@testing-library/dom')
const fs = require("fs")
const domTesting = require('@testing-library/dom')
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default


function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function() {
        require(jsPath)
    })
}


// NOTE: Many of the variables defined in each test are not actually used,
// however its much more efficient for me to copy and paste them per test.


test("testing clearing chart labels", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    // const clearChartButton = document.getElementById("clear-chart-btn")
    const clearChartButton = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})

    // // X and Y Label Inputs (By ID)
    // const chartXLabelInput = document.getElementById("x-label-input")
    // const chartYLabelInput = document.getElementById("y-label-input")
    // Get X,Y value inputs
    let chartXLabelInput = domTesting.getAllByLabelText(document, 'X label')
    let chartYLabelInput = domTesting.getAllByLabelText(document, 'Y label')
   


    // Act:
    const inputXLabel = "XAxis"
    const inputYLabel = "YAxis"
    const user = userEvent.setup()
    await user.type(chartXLabelInput[0], inputXLabel)
    await user.type(chartYLabelInput[0], inputYLabel)


    // Assert:  
    expect(chartXLabelInput[0].value).toBe("XAxis")
    expect(chartYLabelInput[0].value).toBe("YAxis")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(chartXLabelInput[0].value).toBe("")
    expect(chartYLabelInput[0].value).toBe("")


    })


test("testing clearing data points", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})


    // X and Y Value Inputs (By Class)
    let xValueInputs = domTesting.getAllByLabelText(document, 'X')
    let yValueInputs = domTesting.getAllByLabelText(document, 'Y')
   


    // Act:
    const inputX1 = "1"
    const inputY1 = "2"
    const user = userEvent.setup()
    await user.type(xValueInputs[0], inputX1)
    await user.type(yValueInputs[0], inputY1)

    // Assert:
    expect(xValueInputs[0].value).toBe("1")
    expect(yValueInputs[0].value).toBe("2")


    // Act2:
    await user.click(clearChartButton)

    xValueInputs = domTesting.getAllByLabelText(document, 'X')
    yValueInputs = domTesting.getAllByLabelText(document, 'Y')

    // Assert2:
    expect(xValueInputs[0].value).toBe("")
    expect(yValueInputs[0].value).toBe("")


    })


test("testing clearing multiple data points", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The "+" add values button
    const addValuesButton = domTesting.getByRole(document, 'button', {name: '+'})
    // The clear chart button
    const clearChartButton = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
   
    const user = userEvent.setup()
    await user.click(addValuesButton)
    await user.click(addValuesButton)


    // X and Y Value Inputs (By Class)
    let xValueInputs = domTesting.getAllByLabelText(document, 'X')
    let yValueInputs = domTesting.getAllByLabelText(document, 'Y')


    // Act:
    const inputX1 = "1"
    const inputY1 = "2"
    const inputX2 = "3"
    const inputY2 = "4"
    const inputX3 = "5"
    const inputY3 = "6"
    await user.type(xValueInputs[0], inputX1)
    await user.type(yValueInputs[0], inputY1)
    await user.type(xValueInputs[1], inputX2)
    await user.type(yValueInputs[1], inputY2)
    await user.type(xValueInputs[2], inputX3)
    await user.type(yValueInputs[2], inputY3)


    // Assert:
    expect(xValueInputs[0].value).toBe("1")
    expect(yValueInputs[0].value).toBe("2")
    expect(xValueInputs[1].value).toBe("3")
    expect(yValueInputs[1].value).toBe("4")
    expect(xValueInputs[2].value).toBe("5")
    expect(yValueInputs[2].value).toBe("6")


    // Act2:
    await user.click(clearChartButton)

    xValueInputs = domTesting.getAllByLabelText(document, 'X')
    yValueInputs = domTesting.getAllByLabelText(document, 'Y')


    // Assert2:
    expect(xValueInputs[0].value).toBe("")
    expect(yValueInputs[0].value).toBe("")
    // The following input elements no longer exist after the clear.
    expect(xValueInputs[1]).toBeUndefined()
    expect(yValueInputs[1]).toBeUndefined()
    expect(xValueInputs[2]).toBeUndefined()
    expect(yValueInputs[2]).toBeUndefined()


    })


test("testing clearing chart title", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})


    // Chart Title Input ()
    const chartTitleInput = domTesting.getAllByLabelText(document, 'Chart title')
   
    // Act:
    const inputTitle = "MyFavoriteChart"
    const user = userEvent.setup()
    await user.type(chartTitleInput[0], inputTitle)


    // Assert:  
    expect(chartTitleInput[0].value).toBe("MyFavoriteChart")


    // Act2:
    await user.click(clearChartButton)


    // Assert2:
    expect(chartTitleInput[0].value).toBe("")


    })


test("testing clearing chart color", async function () {
    // Arrange:
    initDomFromFiles(
    `${__dirname}/line.html`,
    `${__dirname}/line.js`
    )
    // The clear chart button
    const clearChartButton = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})


    // ChartColorInput
    let chartColorInput = domTesting.getAllByLabelText(document, 'Chart color')
   


    // Act:
    const inputColor = "#ec83ae" // Light Pink :D
    const user = userEvent.setup()
    // await user.type(chartColorInput, inputColor)
    chartColorInput[0].value = inputColor


    // Assert:  
    expect(chartColorInput[0].value).toBe("#ec83ae")


    // Act2:
    await user.click(clearChartButton)
    

    // Assert2:
    expect(chartColorInput[0].value).toBe("#ff4500")


    })


    test("testing clearing all chart data", async function () {
        // Arrange:
        initDomFromFiles(
        `${__dirname}/line.html`,
        `${__dirname}/line.js`
        )
        // The "+" add values button
        const addValuesButton = domTesting.getByRole(document, 'button', {name: '+'})
        // The clear chart button
        const clearChartButton = domTesting.getByRole(document, 'button', {name: 'Clear chart data'})
        // X and Y Label Inputs (By ID)
        let chartXLabelInput = domTesting.getAllByLabelText(document, 'X label')
        let chartYLabelInput = domTesting.getAllByLabelText(document, 'Y label')
        // Chart Title Input ()
        const chartTitleInput  = domTesting.getAllByLabelText(document, 'Chart title')
        // Chart Color Input
        let chartColorInput = domTesting.getAllByLabelText(document, 'Chart color')
       
        const user = userEvent.setup()
        await user.click(addValuesButton)
        await user.click(addValuesButton)
   
        // X and Y Value Inputs (By Class)
        let xValueInputs = domTesting.getAllByLabelText(document, 'X')
        let yValueInputs = domTesting.getAllByLabelText(document, 'Y')
   

        // Act:
        const inputX1 = "1"
        const inputY1 = "2"
        const inputX2 = "3"
        const inputY2 = "4"
        const inputX3 = "5"
        const inputY3 = "6"
        const inputXLabel = "XAxis"
        const inputYLabel = "YAxis"
        const inputTitle = "MyFavoriteChart"
        const inputColor = "#ec83ae"
        await user.type(xValueInputs[0], inputX1)
        await user.type(yValueInputs[0], inputY1)
        await user.type(xValueInputs[1], inputX2)
        await user.type(yValueInputs[1], inputY2)
        await user.type(xValueInputs[2], inputX3)
        await user.type(yValueInputs[2], inputY3)
        await user.type(chartXLabelInput[0], inputXLabel)
        await user.type(chartYLabelInput[0], inputYLabel)
        await user.type(chartTitleInput[0], inputTitle)
        chartColorInput[0].value = inputColor
   
        // Assert:
        expect(xValueInputs[0].value).toBe("1")
        expect(yValueInputs[0].value).toBe("2")
        expect(xValueInputs[1].value).toBe("3")
        expect(yValueInputs[1].value).toBe("4")
        expect(xValueInputs[2].value).toBe("5")
        expect(yValueInputs[2].value).toBe("6")
        expect(chartXLabelInput[0].value).toBe("XAxis")
        expect(chartYLabelInput[0].value).toBe("YAxis")
        expect(chartTitleInput[0].value).toBe("MyFavoriteChart")
        expect(chartColorInput[0].value).toBe("#ec83ae")
   
        // Act2:
        await user.click(clearChartButton)

        xValueInputs = domTesting.getAllByLabelText(document, 'X')
        yValueInputs = domTesting.getAllByLabelText(document, 'Y')
        chartColorInput = domTesting.getAllByLabelText(document, 'Chart color')
   
        // Assert2:
        // Chart Points
        expect(xValueInputs[0].value).toBe("")
        expect(yValueInputs[0].value).toBe("")
        // The following input elements no longer exist after the clear.
        expect(xValueInputs[1]).toBeUndefined()
        expect(yValueInputs[1]).toBeUndefined()
        expect(xValueInputs[2]).toBeUndefined()
        expect(yValueInputs[2]).toBeUndefined()
        // Chart Labels
        expect(chartXLabelInput[0].value).toBe("")
        expect(chartYLabelInput[0].value).toBe("")
        // Chart Title
        expect(chartTitleInput[0].value).toBe("")
        // Chart Color
        expect(chartColorInput[0].value).toBe("#ff4500")
        })

