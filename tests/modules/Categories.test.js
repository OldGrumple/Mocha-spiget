const Categories = require('../../src/modules/Categories');
const axios = require('axios');

// Mock dependencies
jest.mock('axios');

describe('Categories', () => {
    let categories;
    const baseURL = 'https://api.spiget.org/v2';

    beforeEach(() => {
        // Mock axios.create to return a mock client
        const mockClient = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn()
        };
        axios.create.mockReturnValue(mockClient);
        
        categories = new Categories(baseURL);
        jest.clearAllMocks();
    });

    describe('getCategories', () => {
        it('should fetch categories with correct parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Category' }] };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await categories.getCategories(options);

            expect(categories.get).toHaveBeenCalledWith('/categories', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch categories without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Category' }] };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await categories.getCategories();

            expect(categories.get).toHaveBeenCalledWith('/categories', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle empty response', async () => {
            const mockResponse = { data: [] };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await categories.getCategories();

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getCategory', () => {
        it('should fetch a specific category with fields', async () => {
            const mockResponse = { data: { id: 1, name: 'Test Category' } };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await categories.getCategory(1, 'id,name');

            expect(categories.get).toHaveBeenCalledWith('/categories/1', { fields: 'id,name' });
            expect(result).toEqual(mockResponse);
        });

        it('should fetch a specific category without fields', async () => {
            const mockResponse = { data: { id: 1, name: 'Test Category' } };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await categories.getCategory(1);

            expect(categories.get).toHaveBeenCalledWith('/categories/1', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle category not found', async () => {
            const error = new Error('Category not found');
            categories.get = jest.fn().mockRejectedValue(error);

            await expect(categories.getCategory(999)).rejects.toThrow('Category not found');
        });
    });

    describe('getCategoryResources', () => {
        it('should fetch resources in a category with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await categories.getCategoryResources(1, options);

            expect(categories.get).toHaveBeenCalledWith('/categories/1/resources', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch resources in a category without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await categories.getCategoryResources(1);

            expect(categories.get).toHaveBeenCalledWith('/categories/1/resources', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle category with no resources', async () => {
            const mockResponse = { data: [] };
            categories.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await categories.getCategoryResources(1);

            expect(result).toEqual(mockResponse);
        });
    });
}); 