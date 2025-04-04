const SpigetAPI = require('../src/SpigetAPI');

// Mock the module dependencies
jest.mock('../src/modules/Resources');
jest.mock('../src/modules/Authors');
jest.mock('../src/modules/Categories');
jest.mock('../src/modules/Webhooks');
jest.mock('../src/modules/Search');
jest.mock('../src/modules/ResourceFilters');

describe('SpigetAPI', () => {
    let spigetAPI;
    const mockBaseURL = 'https://api.spiget.org/v2';

    beforeEach(() => {
        spigetAPI = new SpigetAPI(mockBaseURL);
    });

    describe('constructor', () => {
        it('should initialize with default base URL', () => {
            const defaultAPI = new SpigetAPI();
            expect(defaultAPI.baseURL).toBe('https://api.spiget.org/v2');
        });

        it('should initialize with custom base URL', () => {
            const customURL = 'https://custom-api.example.com';
            const customAPI = new SpigetAPI(customURL);
            expect(customAPI.baseURL).toBe(customURL);
        });
    });

    describe('Resource methods', () => {
        it('should call getResources with options', async () => {
            const options = { page: 1, size: 10 };
            await spigetAPI.getResources(options);
            expect(spigetAPI.resources.getResources).toHaveBeenCalledWith(options);
        });

        it('should call getResource with id and options', async () => {
            const id = 123;
            const options = { fields: 'name,description' };
            await spigetAPI.getResource(id, options);
            expect(spigetAPI.resources.getResource).toHaveBeenCalledWith(id, options);
        });

        it('should call getResourceAuthor with resourceId', async () => {
            const resourceId = 123;
            await spigetAPI.getResourceAuthor(resourceId);
            expect(spigetAPI.resources.getResourceAuthor).toHaveBeenCalledWith(resourceId);
        });

        it('should call getResourceVersions with resourceId and options', async () => {
            const resourceId = 123;
            const options = { page: 1 };
            await spigetAPI.getResourceVersions(resourceId, options);
            expect(spigetAPI.resources.getResourceVersions).toHaveBeenCalledWith(resourceId, options);
        });

        it('should call getResourceVersion with resourceId and versionId', async () => {
            const resourceId = 123;
            const versionId = 456;
            await spigetAPI.getResourceVersion(resourceId, versionId);
            expect(spigetAPI.resources.getResourceVersion).toHaveBeenCalledWith(resourceId, versionId);
        });

        it('should call getLatestResourceVersion with resourceId', async () => {
            const resourceId = 123;
            await spigetAPI.getLatestResourceVersion(resourceId);
            expect(spigetAPI.resources.getLatestResourceVersion).toHaveBeenCalledWith(resourceId);
        });

        it('should call getResourceUpdates with resourceId and options', async () => {
            const resourceId = 123;
            const options = { page: 1 };
            await spigetAPI.getResourceUpdates(resourceId, options);
            expect(spigetAPI.resources.getResourceUpdates).toHaveBeenCalledWith(resourceId, options);
        });

        it('should call getLatestResourceUpdate with resourceId and options', async () => {
            const resourceId = 123;
            const options = { fields: 'title' };
            await spigetAPI.getLatestResourceUpdate(resourceId, options);
            expect(spigetAPI.resources.getLatestResourceUpdate).toHaveBeenCalledWith(resourceId, options);
        });

        it('should call getResourceReviews with resourceId and options', async () => {
            const resourceId = 123;
            const options = { page: 1 };
            await spigetAPI.getResourceReviews(resourceId, options);
            expect(spigetAPI.resources.getResourceReviews).toHaveBeenCalledWith(resourceId, options);
        });

        it('should call getNewResources with options', async () => {
            const options = { page: 1 };
            await spigetAPI.getNewResources(options);
            expect(spigetAPI.resources.getNewResources).toHaveBeenCalledWith(options);
        });

        it('should call getResourcesForVersions with versions and options', async () => {
            const versions = '1.16.5,1.17.1';
            const options = { method: 'any' };
            await spigetAPI.getResourcesForVersions(versions, options);
            expect(spigetAPI.resources.getResourcesForVersions).toHaveBeenCalledWith(versions, options);
        });

        it('should call getDownloadUrl with resourceId and options', async () => {
            const resourceId = 123;
            const options = { version: 'latest' };
            await spigetAPI.getDownloadUrl(resourceId, options);
            expect(spigetAPI.resources.getDownloadUrl).toHaveBeenCalledWith(resourceId, options);
        });
    });

    describe('Author methods', () => {
        it('should call getAuthors with options', async () => {
            const options = { page: 1 };
            await spigetAPI.getAuthors(options);
            expect(spigetAPI.authors.getAuthors).toHaveBeenCalledWith(options);
        });

        it('should call getAuthor with id and options', async () => {
            const id = 123;
            const options = { fields: 'name' };
            await spigetAPI.getAuthor(id, options);
            expect(spigetAPI.authors.getAuthor).toHaveBeenCalledWith(id, options);
        });

        it('should call getAuthorResources with authorId and options', async () => {
            const authorId = 123;
            const options = { page: 1 };
            await spigetAPI.getAuthorResources(authorId, options);
            expect(spigetAPI.authors.getAuthorResources).toHaveBeenCalledWith(authorId, options);
        });

        it('should call getAuthorReviews with authorId and options', async () => {
            const authorId = 123;
            const options = { page: 1 };
            await spigetAPI.getAuthorReviews(authorId, options);
            expect(spigetAPI.authors.getAuthorReviews).toHaveBeenCalledWith(authorId, options);
        });

        it('should call searchAuthors with query and options', async () => {
            const query = 'notch';
            const options = { field: 'name' };
            await spigetAPI.searchAuthors(query, options);
            expect(spigetAPI.search.searchAuthors).toHaveBeenCalledWith(query, options);
        });
    });

    describe('Category methods', () => {
        it('should call getCategories with options', async () => {
            const options = { page: 1 };
            await spigetAPI.getCategories(options);
            expect(spigetAPI.categories.getCategories).toHaveBeenCalledWith(options);
        });

        it('should call getCategory with id and options', async () => {
            const id = 123;
            const options = { fields: 'name' };
            await spigetAPI.getCategory(id, options);
            expect(spigetAPI.categories.getCategory).toHaveBeenCalledWith(id, options);
        });

        it('should call getCategoryResources with categoryId and options', async () => {
            const categoryId = 123;
            const options = { page: 1 };
            await spigetAPI.getCategoryResources(categoryId, options);
            expect(spigetAPI.categories.getCategoryResources).toHaveBeenCalledWith(categoryId, options);
        });
    });

    describe('Webhook methods', () => {
        it('should call getWebhookEvents', async () => {
            await spigetAPI.getWebhookEvents();
            expect(spigetAPI.webhooks.getWebhookEvents).toHaveBeenCalled();
        });

        it('should call registerWebhook with url and events', async () => {
            const url = 'https://webhook.example.com';
            const events = ['resource.update'];
            await spigetAPI.registerWebhook(url, events);
            expect(spigetAPI.webhooks.registerWebhook).toHaveBeenCalledWith(url, events);
        });

        it('should call getWebhookStatus with id', async () => {
            const id = 123;
            await spigetAPI.getWebhookStatus(id);
            expect(spigetAPI.webhooks.getWebhookStatus).toHaveBeenCalledWith(id);
        });

        it('should call deleteWebhook with id and secret', async () => {
            const id = 123;
            const secret = 'webhook-secret';
            await spigetAPI.deleteWebhook(id, secret);
            expect(spigetAPI.webhooks.deleteWebhook).toHaveBeenCalledWith(id, secret);
        });
    });

    describe('Search methods', () => {
        it('should call searchResources with query and options', async () => {
            const query = 'economy';
            const options = { field: 'name' };
            await spigetAPI.searchResources(query, options);
            expect(spigetAPI.search.searchResources).toHaveBeenCalledWith(query, options);
        });

        it('should call searchByVersions with versions and options', async () => {
            const versions = '1.16.5,1.17.1';
            const options = { method: 'any' };
            await spigetAPI.searchByVersions(versions, options);
            expect(spigetAPI.search.searchByVersions).toHaveBeenCalledWith(versions, options);
        });
    });

    describe('Resource Filter methods', () => {
        it('should call getFreeResources with options', async () => {
            const options = { page: 1 };
            await spigetAPI.getFreeResources(options);
            expect(spigetAPI.filters.getFreeResources).toHaveBeenCalledWith(options);
        });

        it('should call getPremiumResources with options', async () => {
            const options = { page: 1 };
            await spigetAPI.getPremiumResources(options);
            expect(spigetAPI.filters.getPremiumResources).toHaveBeenCalledWith(options);
        });

        it('should call getResourcesByPriceRange with options', async () => {
            const options = { min: 0, max: 10 };
            await spigetAPI.getResourcesByPriceRange(options);
            expect(spigetAPI.filters.getResourcesByPriceRange).toHaveBeenCalledWith(options);
        });
    });
}); 