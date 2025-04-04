const Webhooks = require('../../src/modules/Webhooks');
const axios = require('axios');

// Mock dependencies
jest.mock('axios');

describe('Webhooks', () => {
    let webhooks;
    const baseURL = 'https://api.spiget.org/v2';

    beforeEach(() => {
        // Mock axios.create to return a mock client
        const mockClient = {
            get: jest.fn(),
            post: jest.fn(),
            delete: jest.fn()
        };
        axios.create.mockReturnValue(mockClient);
        
        webhooks = new Webhooks(baseURL);
        jest.clearAllMocks();
    });

    describe('getWebhookEvents', () => {
        it('should fetch available webhook events', async () => {
            const mockResponse = { data: ['resource.create', 'resource.update'] };
            webhooks.get = jest.fn().mockResolvedValue({ data: mockResponse.data });

            const result = await webhooks.getWebhookEvents();

            expect(webhooks.get).toHaveBeenCalledWith('/webhook/events');
            expect(result).toEqual({ data: mockResponse.data });
        });
    });

    describe('registerWebhook', () => {
        it('should register a new webhook', async () => {
            const mockResponse = { data: { id: 1, url: 'https://example.com/webhook' } };
            webhooks.post = jest.fn().mockResolvedValue(mockResponse);

            const url = 'https://example.com/webhook';
            const events = ['resource.create', 'resource.update'];
            const result = await webhooks.registerWebhook(url, events);

            const formData = new URLSearchParams();
            formData.append('url', url);
            formData.append('events', events.join(','));

            expect(webhooks.post).toHaveBeenCalledWith('/webhook/register', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('getWebhookStatus', () => {
        it('should fetch webhook status', async () => {
            const mockResponse = { data: { id: 1, status: 'active' } };
            webhooks.get = jest.fn().mockResolvedValue(mockResponse);

            const result = await webhooks.getWebhookStatus(1);

            expect(webhooks.get).toHaveBeenCalledWith('/webhook/status/1');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('deleteWebhook', () => {
        it('should delete a webhook', async () => {
            const mockResponse = { data: { success: true } };
            webhooks.delete = jest.fn().mockResolvedValue(mockResponse);

            const result = await webhooks.deleteWebhook(1, 'secret123');

            expect(webhooks.delete).toHaveBeenCalledWith('/webhook/delete/1/secret123');
            expect(result).toEqual(mockResponse);
        });
    });
}); 