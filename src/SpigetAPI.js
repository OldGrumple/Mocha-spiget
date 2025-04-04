const Resources = require('./modules/Resources');
const Authors = require('./modules/Authors');
const Categories = require('./modules/Categories');
const Webhooks = require('./modules/Webhooks');
const Search = require('./modules/Search');
const ResourceFilters = require('./modules/ResourceFilters');

class SpigetAPI {
    constructor(baseURL = 'https://api.spiget.org/v2') {
        this.baseURL = baseURL;
        this.resources = new Resources(baseURL);
        this.authors = new Authors(baseURL);
        this.categories = new Categories(baseURL);
        this.webhooks = new Webhooks(baseURL);
        this.search = new Search(baseURL);
        this.filters = new ResourceFilters(baseURL);
    }

    // Resource methods
    getResources(options) {
        return this.resources.getResources(options);
    }

    getResource(id, options) {
        return this.resources.getResource(id, options);
    }

    getResourceAuthor(resourceId) {
        return this.resources.getResourceAuthor(resourceId);
    }

    getResourceVersions(resourceId, options) {
        return this.resources.getResourceVersions(resourceId, options);
    }

    getResourceVersion(resourceId, versionId) {
        return this.resources.getResourceVersion(resourceId, versionId);
    }

    getLatestResourceVersion(resourceId) {
        return this.resources.getLatestResourceVersion(resourceId);
    }

    getResourceUpdates(resourceId, options) {
        return this.resources.getResourceUpdates(resourceId, options);
    }

    getLatestResourceUpdate(resourceId, options) {
        return this.resources.getLatestResourceUpdate(resourceId, options);
    }

    getResourceReviews(resourceId, options) {
        return this.resources.getResourceReviews(resourceId, options);
    }

    getNewResources(options) {
        return this.resources.getNewResources(options);
    }

    getResourcesForVersions(versions, options) {
        return this.resources.getResourcesForVersions(versions, options);
    }

    getDownloadUrl(resourceId, options) {
        return this.resources.getDownloadUrl(resourceId, options);
    }

    downloadResource(resourceId, versionId, outputPath) {
        return this.resources.downloadResource(resourceId, versionId, outputPath);
    }

    // Author methods
    getAuthors(options) {
        return this.authors.getAuthors(options);
    }

    getAuthor(id, options) {
        return this.authors.getAuthor(id, options);
    }

    getAuthorResources(authorId, options) {
        return this.authors.getAuthorResources(authorId, options);
    }

    getAuthorReviews(authorId, options) {
        return this.authors.getAuthorReviews(authorId, options);
    }

    searchAuthors(query, options) {
        return this.search.searchAuthors(query, options);
    }

    // Category methods
    getCategories(options) {
        return this.categories.getCategories(options);
    }

    getCategory(id, options) {
        return this.categories.getCategory(id, options);
    }

    getCategoryResources(categoryId, options) {
        return this.categories.getCategoryResources(categoryId, options);
    }

    // Webhook methods
    getWebhookEvents() {
        return this.webhooks.getWebhookEvents();
    }

    registerWebhook(url, events) {
        return this.webhooks.registerWebhook(url, events);
    }

    getWebhookStatus(id) {
        return this.webhooks.getWebhookStatus(id);
    }

    deleteWebhook(id, secret) {
        return this.webhooks.deleteWebhook(id, secret);
    }

    // Search methods
    searchResources(query, options) {
        return this.search.searchResources(query, options);
    }

    searchByVersions(versions, options) {
        return this.search.searchByVersions(versions, options);
    }

    // Resource Filter Methods
    async getFreeResources(options = {}) {
        return this.filters.getFreeResources(options);
    }

    async getPremiumResources(options = {}) {
        return this.filters.getPremiumResources(options);
    }

    async getResourcesByPriceRange(options = {}) {
        return this.filters.getResourcesByPriceRange(options);
    }
}

module.exports = SpigetAPI; 