const BaseAPI = require("../BaseAPI");

class Search extends BaseAPI {
  /**
   * Search for resources
   * @param {string} query - Search query
   * @param {Object} options - Query parameters
   * @param {string} options.field - Field to search in (name/tag)
   * @param {number} options.page - Page number
   * @param {number} options.size - Items per page
   * @param {string} options.sort - Sort field
   * @param {string} options.fields - Fields to return, separated by commas
   * @returns {Promise<Array>} List of resources
   */
  async searchResources(query, options = {}) {
    const params = { ...options };
    return this.get(`/search/resources/${query}`, params);
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

    /**
   * Search for resources by version
   * @param {string} versions - Comma-separated list of versions
     * @param {Object} options - Query parameters
   * @param {string} options.method - Search method (any/all)
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Array>} List of resources
     */
  async searchByVersions(versions, options = {}) {
        const params = { ...options };
    return this.get(`/resources/for/${versions}`, params);
    }
}

module.exports = Search; 