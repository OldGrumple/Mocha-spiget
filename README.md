# Mocha Spiget

A JavaScript client for the Spiget API, allowing you to interact with SpigotMC's API in a simple and intuitive way.

## Installation

```bash
npm install mocha-spiget
```

## Usage

### Basic Usage

```javascript
const SpigetAPI = require('mocha-spiget');

// Create a new instance of the API client
const spiget = new SpigetAPI();

// Get a list of resources
async function getResources() {
    try {
        const resources = await spiget.getResources({
            page: 1,
            size: 10,
            sort: 'downloads',
            order: 'desc',
            fields: 'id,name,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}
```

### Using Individual Modules

You can also use the individual modules directly if you prefer:

```javascript
const { Resources, Authors, Categories, Webhooks } = require('mocha-spiget');

// Create instances of the modules
const resources = new Resources('https://api.spiget.org/v2');
const authors = new Authors('https://api.spiget.org/v2');
const categories = new Categories('https://api.spiget.org/v2');
const webhooks = new Webhooks('https://api.spiget.org/v2');

// Use the modules directly
async function getResources() {
    try {
        const resourcesList = await resources.getResources({
            page: 1,
            size: 10,
            sort: 'downloads',
            order: 'desc',
            fields: 'id,name,downloads'
        });
        console.log(resourcesList);
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}
```

## Examples

### Get a list of resources
```javascript
async function getResources() {
    try {
        const resources = await spiget.getResources({
            page: 1,
            size: 10,
            sort: 'downloads',
            order: 'desc',
            fields: 'id,name,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}
```

### Get a specific resource
```javascript
async function getResource(id) {
    try {
        const resource = await spiget.getResource(id, 'id,name,description,downloads');
        console.log(resource);
    } catch (error) {
        console.error('Error fetching resource:', error);
    }
}
```

### Get the author of a resource
```javascript
async function getResourceAuthor(resourceId) {
    try {
        const author = await spiget.getResourceAuthor(resourceId);
        console.log(author);
    } catch (error) {
        console.error('Error fetching resource author:', error);
    }
}
```

### Get a list of authors
```javascript
async function getAuthors() {
    try {
        const authors = await spiget.getAuthors({
            page: 1,
            size: 10,
            sort: 'name',
            fields: 'id,name'
        });
        console.log(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
}
```

### Get a specific author
```javascript
async function getAuthor(id) {
    try {
        const author = await spiget.getAuthor(id, 'id,name,icon');
        console.log(author);
    } catch (error) {
        console.error('Error fetching author:', error);
    }
}
```

### Get resources by an author
```javascript
async function getAuthorResources(authorId) {
    try {
        const resources = await spiget.getAuthorResources(authorId, {
            page: 1,
            size: 10,
            sort: 'downloads',
            fields: 'id,name,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error fetching author resources:', error);
    }
}
```

### Get reviews by an author
```javascript
async function getAuthorReviews(authorId) {
    try {
        const reviews = await spiget.getAuthorReviews(authorId, {
            page: 1,
            size: 10,
            sort: 'date',
            fields: 'author,rating,message,date'
        });
        console.log(reviews);
    } catch (error) {
        console.error('Error fetching author reviews:', error);
    }
}
```

### Get a list of categories
```javascript
async function getCategories() {
    try {
        const categories = await spiget.getCategories({
            page: 1,
            size: 10,
            sort: 'name',
            fields: 'id,name'
        });
        console.log(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}
```

### Get a specific category
```javascript
async function getCategory(id) {
    try {
        const category = await spiget.getCategory(id, 'id,name');
        console.log(category);
    } catch (error) {
        console.error('Error fetching category:', error);
    }
}
```

### Get resources in a category
```javascript
async function getCategoryResources(categoryId) {
    try {
        const resources = await spiget.getCategoryResources(categoryId, {
            page: 1,
            size: 10,
            sort: 'downloads',
            fields: 'id,name,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error fetching category resources:', error);
    }
}
```

### Download a plugin
```javascript
async function downloadPlugin() {
    try {
        // Download the latest version of a plugin
        const resourceId = 12345; // Replace with actual resource ID
        const outputPath = await spiget.downloadResource(resourceId);
        console.log(`Plugin downloaded to: ${outputPath}`);
        
        // Download a specific version of a plugin
        const versionId = 67890; // Replace with actual version ID
        const customPath = './plugins/my_plugin.jar';
        const customOutputPath = await spiget.downloadResource(resourceId, versionId, customPath);
        console.log(`Plugin downloaded to: ${customOutputPath}`);
    } catch (error) {
        console.error('Error downloading plugin:', error);
    }
}
```

### Get all versions of a plugin
```javascript
async function getPluginVersions() {
    try {
        const resourceId = 12345; // Replace with actual resource ID
        const versions = await spiget.getResourceVersions(resourceId, {
            page: 1,
            size: 10,
            sort: 'releaseDate',
            fields: 'id,name,releaseDate,downloads'
        });
        console.log(versions);
    } catch (error) {
        console.error('Error fetching plugin versions:', error);
    }
}
```

### Get a specific version of a plugin
```javascript
async function getPluginVersion() {
    try {
        const resourceId = 12345; // Replace with actual resource ID
        const versionId = 67890; // Replace with actual version ID
        const version = await spiget.getResourceVersion(resourceId, versionId);
        console.log(version);
    } catch (error) {
        console.error('Error fetching plugin version:', error);
    }
}
```

### Get the latest version of a plugin
```javascript
async function getLatestPluginVersion() {
    try {
        const resourceId = 12345; // Replace with actual resource ID
        const version = await spiget.getLatestResourceVersion(resourceId);
        console.log(version);
    } catch (error) {
        console.error('Error fetching latest plugin version:', error);
    }
}
```

### Get updates for a plugin
```javascript
async function getPluginUpdates() {
    try {
        const resourceId = 12345; // Replace with actual resource ID
        const updates = await spiget.getResourceUpdates(resourceId, {
            page: 1,
            size: 10,
            sort: 'date',
            fields: 'id,title,description,date,likes'
        });
        console.log(updates);
    } catch (error) {
        console.error('Error fetching plugin updates:', error);
    }
}
```

### Get the latest update for a plugin
```javascript
async function getLatestPluginUpdate() {
    try {
        const resourceId = 12345; // Replace with actual resource ID
        const update = await spiget.getLatestResourceUpdate(resourceId, {
            fields: 'id,title,description,date,likes'
        });
        console.log(update);
    } catch (error) {
        console.error('Error fetching latest plugin update:', error);
    }
}
```

### Get reviews for a plugin
```javascript
async function getPluginReviews() {
    try {
        const resourceId = 12345; // Replace with actual resource ID
        const reviews = await spiget.getResourceReviews(resourceId, {
            page: 1,
            size: 10,
            sort: 'date',
            fields: 'author,rating,message,responseMessage,version,date'
        });
        console.log(reviews);
    } catch (error) {
        console.error('Error fetching plugin reviews:', error);
    }
}
```

### Get new resources
```javascript
async function getNewResources() {
    try {
        const resources = await spiget.getNewResources({
            page: 1,
            size: 10,
            sort: 'releaseDate',
            fields: 'id,name,releaseDate,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error fetching new resources:', error);
    }
}
```

### Get resources for specific Minecraft versions
```javascript
async function getResourcesForVersions() {
    try {
        const versions = '1.16.5,1.17.1'; // Comma-separated list of Minecraft versions
        const resources = await spiget.getResourcesForVersions(versions, {
            method: 'any', // or 'all'
            page: 1,
            size: 10,
            sort: 'downloads',
            fields: 'id,name,testedVersions,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error fetching resources for versions:', error);
    }
}
```

### Search for resources
```javascript
async function searchResources() {
    try {
        const query = 'economy'; // Search query
        const resources = await spiget.searchResources(query, {
            field: 'name', // or 'tag'
            page: 1,
            size: 10,
            sort: 'downloads',
            fields: 'id,name,downloads'
        });
        console.log(resources);
    } catch (error) {
        console.error('Error searching resources:', error);
    }
}
```

### Search for authors
```javascript
async function searchAuthors() {
    try {
        const query = 'notch'; // Search query
        const authors = await spiget.searchAuthors(query, {
            field: 'name',
            page: 1,
            size: 10,
            sort: 'name',
            fields: 'id,name'
        });
        console.log(authors);
    } catch (error) {
        console.error('Error searching authors:', error);
    }
}
```

### Webhook functionality
```javascript
async function webhookExample() {
    try {
        // Get available webhook events
        const events = await spiget.getWebhookEvents();
        console.log('Available webhook events:', events);
        
        // Register a new webhook
        const url = 'https://your-webhook-url.com';
        const webhookEvents = ['resource.update', 'resource.release'];
        const webhook = await spiget.registerWebhook(url, webhookEvents);
        console.log('Webhook registered:', webhook);
        
        // Get webhook status
        const status = await spiget.getWebhookStatus(webhook.id);
        console.log('Webhook status:', status);
        
        // Delete a webhook
        await spiget.deleteWebhook(webhook.id, webhook.secret);
        console.log('Webhook deleted');
    } catch (error) {
        console.error('Error with webhook operations:', error);
    }
}
```

## API Methods

### Resources
- `getResources(options)`: Get a list of resources
- `getResource(id, fields)`: Get a specific resource by ID
- `getResourceAuthor(resourceId)`: Get the author of a resource
- `getResourceVersions(resourceId, options)`: Get all versions of a resource
- `getResourceVersion(resourceId, versionId)`: Get a specific version of a resource
- `getLatestResourceVersion(resourceId)`: Get the latest version of a resource
- `getResourceUpdates(resourceId, options)`: Get updates for a resource
- `getLatestResourceUpdate(resourceId, options)`: Get the latest update for a resource
- `getResourceReviews(resourceId, options)`: Get reviews for a resource
- `getNewResources(options)`: Get new resources
- `getResourcesForVersions(versions, options)`: Get resources for specific Minecraft versions
- `searchResources(query, options)`: Search for resources
- `getDownloadUrl(resourceId, versionId)`: Get the download URL for a resource
- `downloadResource(resourceId, versionId, outputPath)`: Download a resource to a specified path

### Authors
- `getAuthors(options)`: Get a list of authors
- `getAuthor(id, fields)`: Get a specific author by ID
- `getAuthorResources(authorId, options)`: Get resources by an author
- `getAuthorReviews(authorId, options)`: Get reviews by an author
- `searchAuthors(query, options)`: Search for authors

### Categories
- `getCategories(options)`: Get a list of categories
- `getCategory(id, fields)`: Get a specific category by ID
- `getCategoryResources(categoryId, options)`: Get resources in a category

### Webhooks
- `getWebhookEvents()`: Get available webhook events
- `registerWebhook(url, events)`: Register a new webhook
- `getWebhookStatus(id)`: Get webhook status
- `deleteWebhook(id, secret)`: Delete a webhook

## Options

### Common Options
- `page`: Page number (default: 1)
- `size`: Items per page (default: 10)
- `sort`: Sort field (e.g., 'downloads', 'name', 'releaseDate')
- `fields`: Fields to return, separated by commas

### Resource Options
- `order`: Sort order ('asc' or 'desc')

### Version Options
- `method`: Method to use to check for versions ('any' or 'all')

### Search Options
- `field`: Field to search in ('name' or 'tag' for resources, 'name' for authors)

### Download Options
- `resourceId`: The ID of the resource to download
- `versionId`: (Optional) The specific version ID to download. If not provided, the latest version will be downloaded.
- `outputPath`: (Optional) The path where the file should be saved. If not provided, the file will be saved in the current working directory with a name based on the resource name.

## Package Structure

The package is organized in a modular way to make it easier to maintain and extend:

```
mocha-spiget/
├── src/
│   ├── BaseAPI.js           # Base API class with common functionality
│   ├── SpigetAPI.js         # Main API class that uses all modules
│   └── modules/
│       ├── Resources.js      # Resource-related functionality
│       ├── Authors.js        # Author-related functionality
│       ├── Categories.js     # Category-related functionality
│       └── Webhooks.js       # Webhook-related functionality
├── index.js                 # Main entry point
├── package.json             # Package metadata
└── README.md                # Documentation
```

## License

MIT 