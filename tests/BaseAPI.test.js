const BaseAPI = require("../src/BaseAPI");
const axios = require("axios");

// Mock axios
jest.mock("axios");

describe("BaseAPI", () => {
  let api;
  const baseURL = "https://api.spiget.org/v2";

  beforeEach(() => {
    // Mock axios.create to return a mock client
    const mockClient = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    };
    axios.create.mockReturnValue(mockClient);

    // Clear all mocks before each test
    jest.clearAllMocks();
        
    // Create a new instance after clearing mocks
    api = new BaseAPI(baseURL);
  });

  describe("constructor", () => {
    it("should initialize with the correct base URL", () => {
      expect(api.baseURL).toBe(baseURL);
        });

    it("should create an axios instance with the correct base URL", () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: baseURL,
        headers: {
          Accept: "application/json",
        },
            });
        });
    });

  describe("get", () => {
    it("should make a GET request with the correct parameters", async () => {
      const mockResponse = { data: { test: "data" } };
      api.client.get.mockResolvedValue(mockResponse);

      const result = await api.get("/test", { param: "value" });

            expect(api.client.get).toHaveBeenCalledWith('/test', { params: { param: 'value' } });
            expect(result).toEqual(mockResponse.data);
        });

    it("should handle errors correctly", async () => {
      const error = new Error("API Error");
      api.client.get.mockRejectedValue(error);

      await expect(api.get("/test")).rejects.toThrow("API Error");
        });
    });

  describe("post", () => {
    it("should make a POST request with the correct parameters", async () => {
            const mockResponse = { data: { test: 'data' } };
      api.client.post.mockResolvedValue(mockResponse);

      const result = await api.post("/test", { data: "test" });

            expect(api.client.post).toHaveBeenCalledWith('/test', { data: 'test' }, {});
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle errors correctly', async () => {
            const error = new Error('API Error');
            api.client.post.mockRejectedValue(error);

            await expect(api.post('/test')).rejects.toThrow('API Error');
        });
    });

    describe('delete', () => {
        it('should make a DELETE request with the correct parameters', async () => {
            const mockResponse = { data: { test: 'data' } };
            api.client.delete.mockResolvedValue(mockResponse);

            const result = await api.delete('/test');

            expect(api.client.delete).toHaveBeenCalledWith('/test', {});
            expect(result).toEqual(mockResponse.data);
        });

        it('should handle errors correctly', async () => {
            const error = new Error('API Error');
            api.client.delete.mockRejectedValue(error);

            await expect(api.delete('/test')).rejects.toThrow('API Error');
        });
    });

    describe('_handleError', () => {
        it('should handle network errors', () => {
            const error = new Error('Network Error');
            error.isAxiosError = true;
            error.response = null;

            const enhancedError = api._handleError(error);
            expect(enhancedError.message).toBe('No response received from the API');
        });

        it('should handle API errors with response', () => {
            const error = new Error('API Error');
            error.isAxiosError = true;
            error.response = {
                status: 404,
                data: { message: 'Not Found' }
            };

            const enhancedError = api._handleError(error);
            expect(enhancedError.message).toBe('API Error: 404 - Not Found');
            expect(enhancedError.status).toBe(404);
            expect(enhancedError.data).toEqual({ message: 'Not Found' });
        });

        it('should handle non-Axios errors', () => {
            const error = new Error('Custom Error');
            const enhancedError = api._handleError(error);
            expect(enhancedError).toBe(error);
        });

        it('should handle errors with response but no data', () => {
            const error = new Error('API Error');
            error.isAxiosError = true;
            error.response = {
                status: 500,
                data: null
            };

            const enhancedError = api._handleError(error);
            expect(enhancedError.message).toBe('API Error: 500 - Unknown error');
            expect(enhancedError.status).toBe(500);
            expect(enhancedError.data).toBeNull();
        });
    });
}); 