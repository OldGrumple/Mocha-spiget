const axios = require('axios');

class BaseAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.client = axios.create({
            baseURL: baseURL,
            headers: {
                'Accept': 'application/json'
            }
        });
    }

    /**
     * Make a GET request to the API
     * @param {string} endpoint - API endpoint
     * @param {Object} params - Query parameters
     * @returns {Promise<Object>} API response
     */
    async get(endpoint, params = {}) {
        try {
            const response = await this.client.get(endpoint, { params });
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    /**
     * Make a POST request to the API
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request body
     * @param {Object} config - Axios config
     * @returns {Promise<Object>} API response
     */
    async post(endpoint, data = {}, config = {}) {
        try {
            const response = await this.client.post(endpoint, data, config);
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    /**
     * Make a DELETE request to the API
     * @param {string} endpoint - API endpoint
     * @param {Object} config - Axios config
     * @returns {Promise<Object>} API response
     */
    async delete(endpoint, config = {}) {
        try {
            const response = await this.client.delete(endpoint, config);
            return response.data;
        } catch (error) {
            throw this._handleError(error);
        }
    }

    /**
     * Handle API errors
     * @param {Error} error - Error object
     * @returns {Error} Enhanced error object
     * @private
     */
    _handleError(error) {
        if (!error.isAxiosError) {
            return error;
        }

        if (!error.response) {
            const enhancedError = new Error('No response received from the API');
            enhancedError.request = error.request;
            return enhancedError;
        }

        const { status, data } = error.response;
        const message = data && data.message ? data.message : 'Unknown error';
        const enhancedError = new Error(`API Error: ${status} - ${message}`);
        enhancedError.status = status;
        enhancedError.data = data;
        
        return enhancedError;
    }
}

module.exports = BaseAPI; 