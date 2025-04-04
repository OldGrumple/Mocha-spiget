const BaseAPI = require('../BaseAPI');

class Webhooks extends BaseAPI {
    /**
     * Get available webhook events
     * @returns {Promise<Object>} Object containing list of available events
     */
    async getWebhookEvents() {
        return this.get('/webhook/events');
    }

    /**
     * Register a new webhook
     * @param {string} url - URL to call
     * @param {Array<string>} events - Events to register
     * @returns {Promise<Object>} Webhook registration details
     */
    async registerWebhook(url, events) {
        const formData = new URLSearchParams();
        formData.append('url', url);
        formData.append('events', events.join(','));
        
        return this.post('/webhook/register', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }

    /**
     * Get webhook status
     * @param {string} id - Webhook ID
     * @returns {Promise<Object>} Webhook status
     */
    async getWebhookStatus(id) {
        return this.get(`/webhook/status/${id}`);
    }

    /**
     * Delete a webhook
     * @param {string} id - Webhook ID
     * @param {string} secret - Webhook secret
     * @returns {Promise<Object>} Response data
     */
    async deleteWebhook(id, secret) {
        return this.delete(`/webhook/delete/${id}/${secret}`);
    }
}

module.exports = Webhooks; 