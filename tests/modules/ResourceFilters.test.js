const ResourceFilters = require("../../src/modules/ResourceFilters");

describe("ResourceFilters", () => {
  let filters;

  beforeEach(() => {
    filters = new ResourceFilters("https://api.spiget.org/v2");
  });

  describe("getFreeResources", () => {
    it("should fetch free resources with valid parameters", async () => {
            const mockResponse = { data: [{ id: 1, name: 'Free Resource', price: 0 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

      const options = { page: 1, size: 10, sort: "-downloads" };
      const result = await filters.getFreeResources(options);

      expect(filters.get).toHaveBeenCalledWith("/resources/free", options);
      expect(result).toEqual(mockResponse);
        });

    it("should fetch free resources without parameters", async () => {
            const mockResponse = { data: [{ id: 1, name: 'Free Resource', price: 0 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await filters.getFreeResources();

      expect(filters.get).toHaveBeenCalledWith("/resources/free", {});
            expect(result).toEqual(mockResponse);
        });

    it("should handle negative page number", async () => {
            await expect(filters.getFreeResources({ page: -1 }))
                .rejects.toThrow('Invalid parameters');
        });

        it('should handle invalid page size', async () => {
            await expect(filters.getFreeResources({ size: 0 }))
                .rejects.toThrow('Invalid parameters');
        });

        it('should handle API errors', async () => {
      const error = new Error("API Error");
      filters.get = jest.fn().mockRejectedValue(error);

      await expect(filters.getFreeResources()).rejects.toThrow("API Error");
        });
    });

  describe("getPremiumResources", () => {
    it("should fetch premium resources with valid parameters", async () => {
            const mockResponse = { data: [{ id: 1, name: 'Premium Resource', price: 9.99 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

      const options = { page: 1, size: 10, sort: "-price" };
      const result = await filters.getPremiumResources(options);

      expect(filters.get).toHaveBeenCalledWith("/resources/premium", options);
            expect(result).toEqual(mockResponse);
        });

    it("should fetch premium resources without parameters", async () => {
            const mockResponse = { data: [{ id: 1, name: 'Premium Resource', price: 9.99 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await filters.getPremiumResources();

      expect(filters.get).toHaveBeenCalledWith("/resources/premium", {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle negative page number', async () => {
            await expect(filters.getPremiumResources({ page: -1 }))
                .rejects.toThrow('Invalid parameters');
        });

        it('should handle invalid page size', async () => {
            await expect(filters.getPremiumResources({ size: 0 }))
                .rejects.toThrow('Invalid parameters');
        });

        it('should handle API errors', async () => {
            const error = new Error('API Error');
            filters.get = jest.fn().mockRejectedValue(error);

      await expect(filters.getPremiumResources()).rejects.toThrow("API Error");
        });
    });

  describe("getResourcesByPriceRange", () => {
    it("should fetch resources by price range with valid parameters", async () => {
      const mockResponse = { data: [{ id: 1, name: "Resource", price: 5.99 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

      const options = {
        min: 1,
        max: 10,
        page: 1,
        size: 10,
        sort: "price",
      };
      const result = await filters.getResourcesByPriceRange(options);

            expect(filters.get).toHaveBeenCalledWith('/resources/price', options);
            expect(result).toEqual(mockResponse);
        });

        it('should handle missing min price', async () => {
            await expect(filters.getResourcesByPriceRange({ max: 10 }))
                .rejects.toThrow('Missing price parameters');
        });

        it('should handle missing max price', async () => {
            await expect(filters.getResourcesByPriceRange({ min: 1 }))
                .rejects.toThrow('Missing price parameters');
        });

        it('should handle negative min price', async () => {
            await expect(filters.getResourcesByPriceRange({ min: -1, max: 10 }))
                .rejects.toThrow('Price cannot be negative');
        });

        it('should handle negative max price', async () => {
            await expect(filters.getResourcesByPriceRange({ min: 0, max: -1 }))
                .rejects.toThrow('Price cannot be negative');
        });

        it('should handle min price greater than max price', async () => {
            await expect(filters.getResourcesByPriceRange({ min: 10, max: 5 }))
                .rejects.toThrow('Invalid price range');
        });

        it('should handle negative page number', async () => {
            await expect(filters.getResourcesByPriceRange({ min: 1, max: 10, page: -1 }))
                .rejects.toThrow('Invalid parameters');
        });

        it('should handle invalid page size', async () => {
            await expect(filters.getResourcesByPriceRange({ min: 1, max: 10, size: 0 }))
                .rejects.toThrow('Invalid parameters');
        });

        it('should handle API errors', async () => {
            const error = new Error('API Error');
            filters.get = jest.fn().mockRejectedValue(error);

            await expect(filters.getResourcesByPriceRange({ min: 1, max: 10 }))
                .rejects.toThrow('API Error');
        });

        it('should handle undefined page and size', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Resource', price: 5.99 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { min: 1, max: 10 };
            const result = await filters.getResourcesByPriceRange(options);

            expect(filters.get).toHaveBeenCalledWith('/resources/price', options);
            expect(result).toEqual(mockResponse);
        });

        it('should handle valid page with undefined size', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Resource', price: 5.99 }] };
            filters.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { min: 1, max: 10, page: 1 };
            const result = await filters.getResourcesByPriceRange(options);

            expect(filters.get).toHaveBeenCalledWith('/resources/price', options);
            expect(result).toEqual(mockResponse);
        });
    });
}); 