const Resources = require('../../src/modules/Resources');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Mock dependencies
jest.mock('axios');
jest.mock('fs');
jest.mock('path');

describe('Resources', () => {
    let resources;

    beforeEach(() => {
        resources = new Resources('https://api.spiget.org/v2');
    });

    describe('getResources', () => {
        it('should fetch resources with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await resources.getResources(options);

            expect(resources.get).toHaveBeenCalledWith('/resources', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch resources without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResources();

            expect(resources.get).toHaveBeenCalledWith('/resources', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle empty response', async () => {
            const mockResponse = { data: [] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResources();

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getResource', () => {
        it('should fetch a specific resource with fields', async () => {
            const mockResponse = { data: { id: 1, name: 'Test Resource' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResource(1, { fields: 'id,name' });

            expect(resources.get).toHaveBeenCalledWith('/resources/1', { fields: 'id,name' });
            expect(result).toEqual(mockResponse);
        });

        it('should fetch a specific resource without fields', async () => {
            const mockResponse = { data: { id: 1, name: 'Test Resource' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResource(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle resource not found', async () => {
            const error = new Error('Resource not found');
            resources.get = jest.fn().mockRejectedValue(error);

            await expect(resources.getResource(999)).rejects.toThrow('Resource not found');
        });
    });

    describe('getResourceVersions', () => {
        it('should fetch resource versions with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'v1.0.0' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await resources.getResourceVersions(1, options);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/versions', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch resource versions without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'v1.0.0' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceVersions(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/versions', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle resource with no versions', async () => {
            const mockResponse = { data: [] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceVersions(1);

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getResourceVersion', () => {
        it('should fetch a specific resource version', async () => {
            const mockResponse = { data: { id: 1, name: 'v1.0.0' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceVersion(1, 1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/versions/1', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle version not found', async () => {
            const error = new Error('Version not found');
            resources.get = jest.fn().mockRejectedValue(error);

            await expect(resources.getResourceVersion(1, 999)).rejects.toThrow('Version not found');
        });
    });

    describe('getDownloadUrl', () => {
        it('should get download URL for latest version', async () => {
            const mockResponse = { data: { url: 'https://example.com/download' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getDownloadUrl(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/download', {});
            expect(result).toEqual(mockResponse);
        });

        it('should get download URL for specific version', async () => {
            const mockResponse = { data: { url: 'https://example.com/download' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getDownloadUrl(1, { versionId: 1 });

            expect(resources.get).toHaveBeenCalledWith('/resources/1/versions/1/download', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle download URL not found', async () => {
            const error = new Error('Download URL not found');
            resources.get = jest.fn().mockRejectedValue(error);

            await expect(resources.getDownloadUrl(1)).rejects.toThrow('Download URL not found');
        });
    });

    describe('getResourceAuthor', () => {
        it('should fetch the author of a resource', async () => {
            const mockResponse = { data: { id: 1, name: 'Test Author' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceAuthor(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/author');
            expect(result).toEqual(mockResponse);
        });

        it('should handle resource author not found', async () => {
            const error = new Error('Author not found');
            resources.get = jest.fn().mockRejectedValue(error);

            await expect(resources.getResourceAuthor(999)).rejects.toThrow('Author not found');
        });
    });

    describe('getLatestResourceVersion', () => {
        it('should fetch the latest version of a resource', async () => {
            const mockResponse = { data: { id: 1, name: 'v1.0.0' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getLatestResourceVersion(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/versions/latest');
            expect(result).toEqual(mockResponse);
        });

        it('should handle no latest version found', async () => {
            const error = new Error('No latest version found');
            resources.get = jest.fn().mockRejectedValue(error);

            await expect(resources.getLatestResourceVersion(1)).rejects.toThrow('No latest version found');
        });
    });

    describe('getResourceUpdates', () => {
        it('should fetch updates for a resource with parameters', async () => {
            const mockResponse = { data: [{ id: 1, title: 'Update 1' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await resources.getResourceUpdates(1, options);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/updates', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch updates for a resource without parameters', async () => {
            const mockResponse = { data: [{ id: 1, title: 'Update 1' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceUpdates(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/updates', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle resource with no updates', async () => {
            const mockResponse = { data: [] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceUpdates(1);

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getLatestResourceUpdate', () => {
        it('should fetch the latest update for a resource with fields', async () => {
            const mockResponse = { data: { id: 1, title: 'Latest Update' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { fields: 'id,title' };
            const result = await resources.getLatestResourceUpdate(1, options);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/updates/latest', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch the latest update for a resource without fields', async () => {
            const mockResponse = { data: { id: 1, title: 'Latest Update' } };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getLatestResourceUpdate(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/updates/latest', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no latest update found', async () => {
            const error = new Error('No updates found');
            resources.get = jest.fn().mockRejectedValue(error);

            await expect(resources.getLatestResourceUpdate(1)).rejects.toThrow('No updates found');
        });
    });

    describe('getResourceReviews', () => {
        it('should fetch reviews for a resource with parameters', async () => {
            const mockResponse = { data: [{ id: 1, rating: 5 }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await resources.getResourceReviews(1, options);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/reviews', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch reviews for a resource without parameters', async () => {
            const mockResponse = { data: [{ id: 1, rating: 5 }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceReviews(1);

            expect(resources.get).toHaveBeenCalledWith('/resources/1/reviews', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle resource with no reviews', async () => {
            const mockResponse = { data: [] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourceReviews(1);

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getNewResources', () => {
        it('should fetch new resources with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'New Resource' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const options = { page: 1, size: 10 };
            const result = await resources.getNewResources(options);

            expect(resources.get).toHaveBeenCalledWith('/resources/new', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch new resources without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'New Resource' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getNewResources();

            expect(resources.get).toHaveBeenCalledWith('/resources/new', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no new resources', async () => {
            const mockResponse = { data: [] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getNewResources();

            expect(result).toEqual(mockResponse);
        });
    });

    describe('getResourcesForVersions', () => {
        it('should fetch resources for specific versions with parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const versions = '1.16.5,1.17.1';
            const options = { method: 'any' };
            const result = await resources.getResourcesForVersions(versions, options);

            expect(resources.get).toHaveBeenCalledWith('/resources/for/1.16.5,1.17.1', options);
            expect(result).toEqual(mockResponse);
        });

        it('should fetch resources for specific versions without parameters', async () => {
            const mockResponse = { data: [{ id: 1, name: 'Test Resource' }] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const versions = '1.16.5,1.17.1';
            const result = await resources.getResourcesForVersions(versions);

            expect(resources.get).toHaveBeenCalledWith('/resources/for/1.16.5,1.17.1', {});
            expect(result).toEqual(mockResponse);
        });

        it('should handle no resources for versions', async () => {
            const mockResponse = { data: [] };
            resources.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await resources.getResourcesForVersions('1.16.5');

            expect(result).toEqual(mockResponse);
        });
    });
}); 