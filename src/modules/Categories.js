const BaseAPI = require('../BaseAPI');

class Categories extends BaseAPI {
    /**
     * Get a list of categories
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Object>} List of categories
     */
    async getCategories(options = {}) {
        return this.get('/categories', options);
    }

    /**
     * Get a specific category by ID
     * @param {number} id - Category ID
     * @param {string} fields - Fields to return, separated by commas
     * @returns {Promise<Object>} Category details
     */
    async getCategory(id, fields = null) {
        const params = fields ? { fields } : {};
        return this.get(`/categories/${id}`, params);
    }

    /**
     * Get resources in a category
     * @param {number} categoryId - Category ID
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Object>} List of resources
     */
    async getCategoryResources(categoryId, options = {}) {
        return this.get(`/categories/${categoryId}/resources`, options);
    }
}

module.exports = Categories; 