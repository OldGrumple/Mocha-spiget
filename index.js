const SpigetAPI = require('./src/SpigetAPI');
const Resources = require('./src/modules/Resources');
const Authors = require('./src/modules/Authors');
const Categories = require('./src/modules/Categories');
const Webhooks = require('./src/modules/Webhooks');
const Search = require('./src/modules/Search');
const ResourceFilters = require('./src/modules/ResourceFilters');
const BaseAPI = require('./src/BaseAPI');

// Export the main class
module.exports = {
    SpigetAPI,
    Resources,
    Authors,
    Categories,
    Webhooks,
    Search,
    ResourceFilters,
    BaseAPI
};

// Export individual modules for direct access if needed
module.exports.Resources = require('./src/modules/Resources');
module.exports.Authors = require('./src/modules/Authors');
module.exports.Categories = require('./src/modules/Categories');
module.exports.Webhooks = require('./src/modules/Webhooks');
module.exports.BaseAPI = require('./src/BaseAPI'); 