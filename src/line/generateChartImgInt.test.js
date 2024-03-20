/**
 * @jest-environment jsdom
 */

require("whatwg-fetch")
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

//mock the module
jest.mock('../lib/generateChartImg', () => {
    return jest.fn().mockResolvedValue('http://placekitten.com/480/480');
  });
  
  //then, require the mocked module
  const generateChartImg = require('../lib/generateChartImg');
  
  describe('generateChartImg Integration Test', () => {
    beforeEach(() => {
      //ensure the mock is cleared and reset before each test
      generateChartImg.mockClear();
    });
  
    it('should send the correct data to the chart generation function', async () => {
        // Arrange:
        initDomFromFiles(
            `${__dirname}/line.html`,
            `${__dirname}/line.js`
            )
            // The "+" add values button
            const addValuesButton = domTesting.getByRole(document, 'button', {name: '+'})
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
            const chartType = "line"
            const inputX1 = "1"
            const inputY1 = "2"
            const inputX2 = "3"
            const inputY2 = "4"
            const inputX3 = "5"
            const inputY3 = "6"
            const xLabel = "XAxis"
            const yLabel = "YAxis"
            const title = "MyFavoriteChart"
            const color = "#ec83ae"
            await user.type(xValueInputs[0], inputX1)
            await user.type(yValueInputs[0], inputY1)
            await user.type(xValueInputs[1], inputX2)
            await user.type(yValueInputs[1], inputY2)
            await user.type(xValueInputs[2], inputX3)
            await user.type(yValueInputs[2], inputY3)
            await user.type(chartXLabelInput[0], xLabel)
            await user.type(chartYLabelInput[0], yLabel)
            await user.type(chartTitleInput[0], title)
            chartColorInput[0].value = color

            const data = [
                {x: xValueInputs[0], y: yValueInputs[0]},
                {x: xValueInputs[1], y: yValueInputs[1]},
                {x: xValueInputs[2], y: yValueInputs[2]}
            ]
  
        //call the mocked function
        const resultUrl = await generateChartImg(chartType, data, xLabel, yLabel, title, color);
  
        //assertions
        expect(generateChartImg).toHaveBeenCalledWith(chartType, data, xLabel, yLabel, title, color);
        expect(resultUrl).toEqual('http://placekitten.com/480/480');
    });
});
  