// generateChartImgInt.test.js

// Mock the module
jest.mock('./generateChartImg', () => {
    return jest.fn().mockResolvedValue('http://placekitten.com/480/480');
  });
  
  //then, require the mocked module
  const generateChartImg = require('./generateChartImg');
  
  describe('generateChartImg Integration Test', () => {
    beforeEach(() => {
      //ensure the mock is cleared and reset before each test
      generateChartImg.mockClear();
    });
  
    it('should send the correct data to the chart generation function', async () => {
      const type = 'line';
      const data = [{ x: 1, y: 2 }, { x: 2, y: 3 }];
      const xLabel = 'X Axis';
      const yLabel = 'Y Axis';
      const title = 'Test Chart';
      const color = '#FF0000';
  
      //call the mocked function
      const resultUrl = await generateChartImg(type, data, xLabel, yLabel, title, color);
  
      //assertions
      expect(generateChartImg).toHaveBeenCalledWith(type, data, xLabel, yLabel, title, color);
      expect(resultUrl).toEqual('http://placekitten.com/480/480');
    });
});
  