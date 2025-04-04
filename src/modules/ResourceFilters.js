const BaseAPI = require('../BaseAPI');

/**
 * Module for filtering Spiget resources
 */
class ResourceFilters extends BaseAPI {
    constructor(baseURL) {
        super(baseURL);
    }

    /**
     * Get all free resources
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Page size
     * @param {string} options.fields - Fields to return, separated by commas
     * @param {string} options.sort - Sort field
     * @returns {Promise<Object>} List of free resources
     */
    async getFreeResources(options = {}) {
        if (options.page !== undefined && options.page < 0) {
            throw new Error('Invalid parameters');
        }
        if (options.size !== undefined && options.size < 1) {
            throw new Error('Invalid parameters');
        }
        return this.get('/resources/free', options);
    }

    /**
     * Get all premium resources
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Page size
     * @param {string} options.fields - Fields to return, separated by commas
     * @param {string} options.sort - Sort field
     * @returns {Promise<Object>} List of premium resources
     */
    async getPremiumResources(options = {}) {
        if (options.page !== undefined && options.page < 0) {
            throw new Error('Invalid parameters');
        }
        if (options.size !== undefined && options.size < 1) {
            throw new Error('Invalid parameters');
        }
        return this.get('/resources/premium', options);
    }

    /**
     * Get resources by price range
     * @param {Object} options - Query parameters
     * @param {number} options.min - Minimum price
     * @param {number} options.max - Maximum price
     * @param {number} options.page - Page number
     * @param {number} options.size - Page size
     * @param {string} options.fields - Fields to return, separated by commas
     * @param {string} options.sort - Sort field
     * @returns {Promise<Object>} List of resources within price range
     */
    async getResourcesByPriceRange(options = {}) {
        const { min, max, page, size } = options;

        if (min === undefined || max === undefined) {
            throw new Error('Missing price parameters');
        }

        if (min < 0 || max < 0) {
            throw new Error('Price cannot be negative');
        }

        if (min > max) {
            throw new Error('Invalid price range');
        }

        if (page !== undefined && page < 0) {
            throw new Error('Invalid parameters');
        }
        if (size !== undefined && size < 1) {
            throw new Error('Invalid parameters');
        }

        return this.get('/resources/price', options);
    }
}

module.exports = ResourceFilters; 