const Authors = require("../../src/modules/Authors");
const axios = require("axios");

// Mock dependencies
jest.mock("axios");

describe("Authors", () => {
  let authors;
  const baseURL = "https://api.spiget.org/v2";

  beforeEach(() => {
    // Mock axios.create to return a mock client
    const mockClient = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    };
    axios.create.mockReturnValue(mockClient);

    authors = new Authors(baseURL);
    jest.clearAllMocks();
  });

  describe("getAuthors", () => {
    it("should fetch authors with correct parameters", async () => {
      const mockResponse = { data: [{ id: 1, name: "Test Author" }] };
      authors.get = jest.fn().mockResolvedValue(mockResponse);

      const options = { page: 1, size: 10 };
      const result = await authors.getAuthors(options);

      expect(authors.get).toHaveBeenCalledWith("/authors", options);
      expect(result).toEqual(mockResponse);
        });

    it("should fetch authors without parameters", async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Author' }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await authors.getAuthors();

      expect(authors.get).toHaveBeenCalledWith("/authors", {});
            expect(result).toEqual(mockResponse);
        });

    it("should handle empty response", async () => {
      const mockResponse = { data: [] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await authors.getAuthors();

            expect(result).toEqual(mockResponse);
        });
    });

  describe("getAuthor", () => {
    it("should fetch a specific author with fields", async () => {
      const mockResponse = { data: { id: 1, name: "Test Author" } };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await authors.getAuthor(1, "id,name");

            expect(authors.get).toHaveBeenCalledWith('/authors/1', { fields: 'id,name' });
            expect(result).toEqual(mockResponse);
        });

    it("should fetch a specific author without fields", async () => {
            const mockResponse = { data: { id: 1, name: 'Test Author' } };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await authors.getAuthor(1);

      expect(authors.get).toHaveBeenCalledWith("/authors/1", {});
            expect(result).toEqual(mockResponse);
        });

    it("should handle author not found", async () => {
      const error = new Error("Author not found");
      authors.get = jest.fn().mockRejectedValue(error);

      await expect(authors.getAuthor(999)).rejects.toThrow("Author not found");
        });
    });

    describe('getAuthorResources', () => {
        it('should fetch resources by an author with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await authors.getAuthorResources(1, options);

            expect(authors.get).toHaveBeenCalledWith('/authors/1/resources', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch resources by an author without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await authors.getAuthorResources(1);

            expect(authors.get).toHaveBeenCalledWith('/authors/1/resources', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle author with no resources', async () => {
            const mockResponse = { data: [] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await authors.getAuthorResources(1);

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getAuthorReviews', () => {
        it('should fetch reviews by an author with parameters', async () => {
            const mockResponse = { data: [{ id: 1, rating: 5 }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await authors.getAuthorReviews(1, options);

            expect(authors.get).toHaveBeenCalledWith('/authors/1/reviews', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch reviews by an author without parameters', async () => {
            const mockResponse = { data: [{ id: 1, rating: 5 }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await authors.getAuthorReviews(1);

            expect(authors.get).toHaveBeenCalledWith('/authors/1/reviews', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle author with no reviews', async () => {
            const mockResponse = { data: [] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await authors.getAuthorReviews(1);

            expect(result).toEqual(mockResponse);
        });
    });

    describe('searchAuthors', () => {
        it('should search for authors with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Author' }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const query = 'test';
            const options = { field: 'name' };
            const result = await authors.searchAuthors(query, options);

            expect(authors.get).toHaveBeenCalledWith('/search/authors/test', options);
            expect(result).toEqual(mockResponse);
        });

        it('should search for authors without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Author' }] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const query = 'test';
            const result = await authors.searchAuthors(query);

            expect(authors.get).toHaveBeenCalledWith('/search/authors/test', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no search results', async () => {
            const mockResponse = { data: [] };
            authors.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await authors.searchAuthors('nonexistent');

            expect(result).toEqual(mockResponse);
        });
    });
}); 