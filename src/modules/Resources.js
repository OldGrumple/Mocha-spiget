const BaseAPI = require("../BaseAPI");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

class Resources extends BaseAPI {
  constructor(baseURL) {
    super(baseURL);
  }

  /**
   * Get a list of resources
   * @param {Object} options - Query parameters
   * @param {number} options.page - Page number
   * @param {number} options.size - Items per page
   * @param {string} options.sort - Sort field
   * @param {string} options.fields - Fields to return, separated by commas
   * @returns {Promise<Array>} List of resources
   */
  async getResources(options = {}) {
    return this.get("/resources", options);
    }

    /**
   * Get a specific resource
   * @param {number} id - Resource ID
     * @param {Object} options - Query parameters
     * @param {string} options.fields - Fields to return, separated by commas
   * @returns {Promise<Object>} Resource details
     */
  async getResource(resourceId, options = {}) {
    return this.get(`/resources/${resourceId}`, options);
    }

    /**
   * Get the author of a resource
   * @param {number} resourceId - Resource ID
   * @returns {Promise<Object>} Author details
     */
  async getResourceAuthor(resourceId) {
    return this.get(`/resources/${resourceId}/author`);
    }

    /**
   * Get versions of a resource
     * @param {number} resourceId - Resource ID
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
   * @returns {Promise<Array>} List of versions
     */
  async getResourceVersions(resourceId, options = {}) {
    return this.get(`/resources/${resourceId}/versions`, options);
    }

    /**
   * Get a specific version of a resource
     * @param {number} resourceId - Resource ID
   * @param {number} versionId - Version ID
     * @param {Object} options - Query parameters
     * @param {string} options.fields - Fields to return, separated by commas
   * @returns {Promise<Object>} Version details
     */
  async getResourceVersion(resourceId, versionId, options = {}) {
    return this.get(`/resources/${resourceId}/versions/${versionId}`, options);
    }

    /**
   * Get the latest version of a resource
     * @param {number} resourceId - Resource ID
   * @returns {Promise<Object>} Latest version details
     */
  async getLatestResourceVersion(resourceId) {
    return this.get(`/resources/${resourceId}/versions/latest`);
    }

    /**
     * Get updates for a resource
     * @param {number} resourceId - Resource ID
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Array>} List of updates
     */
    async getResourceUpdates(resourceId, options = {}) {
        const params = { ...options };
        return this.get(`/resources/${resourceId}/updates`, params);
    }

    /**
     * Get the latest update for a resource
     * @param {number} resourceId - Resource ID
     * @param {Object} options - Query parameters
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Object>} Latest update details
     */
    async getLatestResourceUpdate(resourceId, options = {}) {
        const params = { ...options };
        return this.get(`/resources/${resourceId}/updates/latest`, params);
    }

    /**
     * Get reviews for a resource
     * @param {number} resourceId - Resource ID
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Array>} List of reviews
     */
    async getResourceReviews(resourceId, options = {}) {
        const params = { ...options };
        return this.get(`/resources/${resourceId}/reviews`, params);
    }

    /**
     * Get new resources
     * @param {Object} options - Query parameters
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Array>} List of new resources
     */
    async getNewResources(options = {}) {
        const params = { ...options };
        return this.get('/resources/new', params);
    }

    /**
     * Get resources for specific Minecraft versions
     * @param {string} versions - Comma-separated list of Minecraft versions
     * @param {Object} options - Query parameters
     * @param {string} options.method - Method to use to check for versions (any/all)
     * @param {number} options.page - Page number
     * @param {number} options.size - Items per page
     * @param {string} options.sort - Sort field
     * @param {string} options.fields - Fields to return, separated by commas
     * @returns {Promise<Array>} List of resources
     */
    async getResourcesForVersions(versions, options = {}) {
        const params = { ...options };
        return this.get(`/resources/for/${versions}`, params);
    }

    /**
     * Get the download URL for a resource version
     * @param {number} resourceId - Resource ID
     * @param {Object} options - Options for the download URL
     * @param {number} options.versionId - Specific version ID to download (optional)
     * @returns {Promise<string>} Download URL for the resource
     */
    async getDownloadUrl(resourceId, options = {}) {
        if (options.versionId) {
            return this.get(`/resources/${resourceId}/versions/${options.versionId}/download`, {});
        }
        return this.get(`/resources/${resourceId}/download`, {});
    }
}

module.exports = Resources; 