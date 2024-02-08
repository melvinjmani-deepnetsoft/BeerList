import AxiosHelper from './AxiosHelper'; // Update the path accordingly
import axios from 'axios';

jest.mock('axios');

describe('AxiosHelper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return successful response', async () => {
      const mockData = { message: 'Success' };
      const mockResponse = { data: mockData };

      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const axiosHelper = new AxiosHelper('http://example.com');
      const response = await axiosHelper.get('/test');

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('http://example.com/test');
    });

    it('should retry on failure and return successful response', async () => {
      const mockData = { message: 'Success' };
      const mockResponse = { data: mockData };

      (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch')).mockResolvedValueOnce(mockResponse);

      const axiosHelper = new AxiosHelper('http://example.com');
      const response = await axiosHelper.get('/test');

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledTimes(2);
      expect(axios.get).toHaveBeenCalledWith('http://example.com/test');
    });

    it('should return failure response after retries exhausted', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

      const axiosHelper = new AxiosHelper('http://example.com');
      const response = await axiosHelper.get('/test');

      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.error).toBeDefined();
      expect(axios.get).toHaveBeenCalledTimes(axiosHelper['retries'] + 1);
      expect(axios.get).toHaveBeenCalledWith('http://example.com/test');
    });
  });
});
