const Search = require('../../src/modules/Search');

describe('Search', () => {
    let search;

    beforeEach(() => {
        search = new Search('https://api.spiget.org/v2');
    });

    describe('searchResources', () => {
        it('should search for resources with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { field: 'name', page: 1, size: 10 };
            const result = await search.searchResources('test', options);

            expect(search.get).toHaveBeenCalledWith('/search/resources/test', options);
            expect(result).toEqual(mockResponse);
        });

        it('should search for resources without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await search.searchResources('test');

            expect(search.get).toHaveBeenCalledWith('/search/resources/test', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no search results', async () => {
            const mockResponse = { data: [] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await search.searchResources('nonexistent');

            expect(result).toEqual(mockResponse);
        });
    });

    describe('searchAuthors', () => {
        it('should search for authors with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Author' }] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { field: 'name', page: 1, size: 10 };
            const result = await search.searchAuthors('test', options);

            expect(search.get).toHaveBeenCalledWith('/search/authors/test', options);
            expect(result).toEqual(mockResponse);
        });

        it('should search for authors without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Author' }] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await search.searchAuthors('test');

            expect(search.get).toHaveBeenCalledWith('/search/authors/test', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no search results', async () => {
            const mockResponse = { data: [] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await search.searchAuthors('nonexistent');

            expect(result).toEqual(mockResponse);
        });
    });

    describe('searchByVersions', () => {
        it('should search for resources by versions with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const versions = '1.16.5,1.17.1';
            const options = { method: 'any' };
            const result = await search.searchByVersions(versions, options);

            expect(search.get).toHaveBeenCalledWith('/resources/for/1.16.5,1.17.1', options);
            expect(result).toEqual(mockResponse);
        });

        it('should search for resources by versions without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const versions = '1.16.5,1.17.1';
            const result = await search.searchByVersions(versions);

            expect(search.get).toHaveBeenCalledWith('/resources/for/1.16.5,1.17.1', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no resources for versions', async () => {
            const mockResponse = { data: [] };
            search.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await search.searchByVersions('1.16.5');

            expect(result).toEqual(mockResponse);
        });
    });
}); 