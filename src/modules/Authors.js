const BaseAPI = require('../BaseAPI');

class Authors extends BaseAPI {
    /**
     * Get a list of authors
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Object>} List of authors
     */
    async getAuthors(options = {}) {
        return this.get('/authors', options);
    }

    /**
     * Get a specific author by ID
     * @param {number} id - Author ID
     * @param {string} fields - Fields to return, separated by commas
     * @returns {Promise<Object>} Author details
     */
    async getAuthor(id, fields = null) {
        const params = fields ? { fields } : {};
        return this.get(`/authors/${id}`, params);
    }

    /**
     * Get resources by an author
     * @param {number} authorId - Author ID
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Object>} List of resources
     */
    async getAuthorResources(authorId, options = {}) {
        return this.get(`/authors/${authorId}/resources`, options);
    }

    /**
     * Get reviews by an author
     * @param {number} authorId - Author ID
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Object>} List of reviews
     */
    async getAuthorReviews(authorId, options = {}) {
        return this.get(`/authors/${authorId}/reviews`, options);
    }

    /**
     * Search for authors
     * @param {string} query - Search query
     * @param {Object} options - Query parameters
     * @param {string} options.field - Field to search in (name)
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Array>} List of authors
     */
    async searchAuthors(query, options = {}) {
        const params = { ...options };
        return this.get(`/search/authors/${query}`, params);
    }
}

module.exports = Authors; 