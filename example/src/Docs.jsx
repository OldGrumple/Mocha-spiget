import React, { useState, useEffect } from 'react';
import styles from './styles/Docs.module.css';
import CodeBlock from './components/CodeBlock';

function Docs() {
  const [activeSection, setActiveSection] = useState('quick-start');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const initSpiget = async () => {
    try {
      const { SpigetAPI } = await import('mocha-spiget');
      const spiget = new SpigetAPI();
      return spiget;
    } catch (error) {
      console.error('Error initializing Spiget:', error);
      throw error;
    }
  };

  useEffect(() => {
    initSpiget()
      .then(spiget => {
        // Use spiget instance here
        console.log('Spiget initialized successfully');
      })
      .catch(error => {
        console.error('Failed to initialize Spiget API');
      });
  }, []);

  return (
    <div className={styles.docsContainer}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Documentation</h2>
        <nav>
          <button
            onClick={() => scrollToSection('quick-start')}
            className={`${styles.navButton} ${
              activeSection === 'quick-start' ? styles.navButtonActive : ''
            }`}
          >
            Quick Start
          </button>
          <button
            onClick={() => scrollToSection('core-concepts')}
            className={`${styles.navButton} ${
              activeSection === 'core-concepts' ? styles.navButtonActive : ''
            }`}
          >
            Core Concepts
          </button>
          <button
            onClick={() => scrollToSection('api-reference')}
            className={`${styles.navButton} ${
              activeSection === 'api-reference' ? styles.navButtonActive : ''
            }`}
          >
            API Reference
          </button>
          <button
            onClick={() => scrollToSection('common-parameters')}
            className={`${styles.navButton} ${
              activeSection === 'common-parameters' ? styles.navButtonActive : ''
            }`}
          >
            Common Parameters
          </button>
          <button
            onClick={() => scrollToSection('examples')}
            className={`${styles.navButton} ${
              activeSection === 'examples' ? styles.navButtonActive : ''
            }`}
          >
            Examples
          </button>
        </nav>
      </div>

      <div className={styles.mainContent}>
        <h1 className={styles.sectionTitle}>Mocha-Spiget Documentation</h1>
        <p className={styles.description}>
          The <strong>mocha-spiget</strong> package provides a simple and powerful interface to interact with the SpigotMC API. This documentation will guide you through installation, basic usage, and advanced features.
        </p>

        <div id="quick-start" className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Start</h2>
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>1. Installation</h3>
            <p className={styles.description}>
              Install the package using npm. This will add mocha-spiget to your project's dependencies.
            </p>
            <CodeBlock
              code={`npm install mocha-spiget`}
              language="bash"
            />
          </div>
          
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>2. Initialize the Client</h3>
            <p className={styles.description}>
              Import the SpigetAPI class and create a new instance. This client will be used for all API interactions.
            </p>
            <CodeBlock
              code={`import { SpigetAPI } from 'mocha-spiget';

const spiget = new SpigetAPI();`}
              language="javascript"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>3. Dynamic Initialization (Optional)</h3>
            <p className={styles.description}>
              For better code splitting and lazy loading, you can dynamically import the package using the <code>import()</code> function.
              This is particularly useful in React applications or when you want to load the package only when needed.
            </p>
            <CodeBlock
              code={`// Using dynamic import
const initSpiget = async () => {
  try {
    const { SpigetAPI } = await import('mocha-spiget');
    const spiget = new SpigetAPI();
    return spiget;
  } catch (error) {
    console.error('Error initializing Spiget:', error);
    throw error;
  }
};

// Usage in React useEffect
useEffect(() => {
  initSpiget()
    .then(spiget => {
      // Use spiget instance here
      console.log('Spiget initialized successfully');
    })
    .catch(error => {
      console.error('Failed to initialize Spiget API');
    });
}, []);`}
              language="javascript"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>4. Make Your First API Call</h3>
            <p className={styles.description}>
              Use the client to fetch a list of resources. This example demonstrates pagination, sorting, and field selection.
              The response will include resource data and metadata about the pagination.
            </p>
            <CodeBlock
              code={`// Get a list of resources
spiget.getResources({
  page: 1,
  size: 10,
  sort: 'downloads',
  order: 'desc',
  fields: 'id,name,downloads'
}).then(resources => {
  console.log(resources);
});`}
              language="javascript"
            />
          </div>
        </div>

        <div id="core-concepts" className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Concepts</h2>
          
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Authentication</h3>
            <p className={styles.description}>
              While the SpigotMC API is primarily public, some endpoints may require authentication.
              You can provide an API key during client initialization for authenticated requests.
            </p>
            <CodeBlock
              code={`const spiget = new SpigetAPI({
  apiKey: 'your-api-key' // Optional
});`}
              language="javascript"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Response Format</h3>
            <p className={styles.description}>
              All API responses follow a consistent JSON structure. The response includes both the requested data
              and metadata about the pagination state. This format makes it easy to handle paginated results
              and track the total number of available items.
            </p>
            <CodeBlock
              code={`{
  "data": [...], // The actual response data
  "meta": {
    "page": 1,
    "size": 10,
    "total": 100
  }
}`}
              language="json"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Error Handling</h3>
            <p className={styles.description}>
              The API uses standard HTTP response codes and provides detailed error messages.
              Each error response includes an error code and a human-readable description
              to help you identify and resolve issues.
            </p>
            <CodeBlock
              code={`{
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}`}
              language="json"
            />
          </div>
        </div>

        <div id="api-reference" className={styles.section}>
          <h2 className={styles.sectionTitle}>API Reference</h2>
          
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Resources</h3>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>List Resources</h4>
              <p className={styles.description}>
                Retrieve a paginated list of resources. You can customize the response by specifying
                which fields to include and how to sort the results.
              </p>
              <CodeBlock
                code={`spiget.getResources({
  page: 1,
  size: 10,
  sort: 'downloads',
  order: 'desc',
  fields: 'id,name,downloads'
})`}
                language="javascript"
              />
            </div>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Get Resource Details</h4>
              <p className={styles.description}>
                Fetch detailed information about a specific resource by its ID.
                You can specify which fields to include in the response.
              </p>
              <CodeBlock
                code={`spiget.getResource(resourceId, 'id,name,description,downloads')`}
                language="javascript"
              />
            </div>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Download Resource</h4>
              <p className={styles.description}>
                Get the download URL for a resource. You can either get the latest version
                or specify a particular version by providing the version ID.
              </p>
              <CodeBlock
                code={`// Get latest version
spiget.getDownloadUrl(resourceId)

// Get specific version
spiget.getDownloadUrl(resourceId, { versionId })`}
                language="javascript"
              />
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Authors</h3>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>List Authors</h4>
              <p className={styles.description}>
                Retrieve a list of authors with pagination support. You can customize
                the response by specifying which fields to include.
              </p>
              <CodeBlock
                code={`spiget.getAuthors({
  page: 1,
  size: 10,
  sort: 'name',
  fields: 'id,name'
})`}
                language="javascript"
              />
            </div>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Get Author Details</h4>
              <p className={styles.description}>
                Fetch detailed information about a specific author by their ID.
                You can specify which fields to include in the response.
              </p>
              <CodeBlock
                code={`spiget.getAuthor(authorId, 'id,name,icon')`}
                language="javascript"
              />
            </div>
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Categories</h3>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>List Categories</h4>
              <p className={styles.description}>
                Retrieve a list of all available categories. You can customize
                the response by specifying which fields to include.
              </p>
              <CodeBlock
                code={`spiget.getCategories({
  page: 1,
  size: 10,
  sort: 'name',
  fields: 'id,name'
})`}
                language="javascript"
              />
            </div>
            <div className={styles.subsection}>
              <h4 className={styles.subsectionTitle}>Get Category Resources</h4>
              <p className={styles.description}>
                Retrieve all resources within a specific category. You can customize
                the response with pagination, sorting, and field selection.
              </p>
              <CodeBlock
                code={`spiget.getCategoryResources(categoryId, {
  page: 1,
  size: 10,
  sort: 'downloads',
  fields: 'id,name,downloads'
})`}
                language="javascript"
              />
            </div>
          </div>
        </div>

        <div id="common-parameters" className={styles.section}>
          <h2 className={styles.sectionTitle}>Common Parameters</h2>
          <p className={styles.description}>
            The following parameters are available across multiple endpoints to help you
            customize your API requests and responses.
          </p>
          <div className={styles.parameterGrid}>
            <div className={styles.parameterCard}>
              <h3 className={styles.parameterTitle}>Pagination</h3>
              <ul className={styles.parameterList}>
                <li className={styles.parameterItem}>
                  <strong>page</strong>: Page number (default: 1)
                  <p className={styles.description}>Specifies which page of results to return.</p>
                </li>
                <li className={styles.parameterItem}>
                  <strong>size</strong>: Items per page (default: 10)
                  <p className={styles.description}>Controls how many items are returned per page.</p>
                </li>
              </ul>
            </div>
            <div className={styles.parameterCard}>
              <h3 className={styles.parameterTitle}>Sorting</h3>
              <ul className={styles.parameterList}>
                <li className={styles.parameterItem}>
                  <strong>sort</strong>: Field to sort by
                  <p className={styles.description}>The field name to use for sorting the results.</p>
                </li>
                <li className={styles.parameterItem}>
                  <strong>order</strong>: 'asc' or 'desc'
                  <p className={styles.description}>Specifies the sort order (ascending or descending).</p>
                </li>
              </ul>
            </div>
            <div className={styles.parameterCard}>
              <h3 className={styles.parameterTitle}>Fields</h3>
              <p className={styles.description}>
                A comma-separated list of fields to include in the response.
                This helps reduce response size by only returning the data you need.
              </p>
            </div>
          </div>
        </div>

        <div id="examples" className={styles.section}>
          <h2 className={styles.sectionTitle}>Examples</h2>
          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Search and Download Plugin</h3>
            <p className={styles.description}>
              This example demonstrates how to search for a plugin by name and download it.
              It includes error handling and demonstrates the use of async/await for cleaner code.
            </p>
            <CodeBlock
              code={`async function searchAndDownloadPlugin() {
  try {
    // Search for a plugin
    const searchResults = await spiget.searchResources('economy', {
      field: 'name',
      size: 1
    });

    if (searchResults.data.length > 0) {
      const plugin = searchResults.data[0];
      
      // Get download URL
      const downloadUrl = await spiget.getDownloadUrl(plugin.id);
      console.log(\`Download URL: \${downloadUrl}\`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}`}
              language="javascript"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>List Plugins by Author</h3>
            <p className={styles.description}>
              Retrieve all plugins created by a specific author. This example shows how to use the author's ID to fetch their plugins.
            </p>
            <CodeBlock
              code={`async function listPluginsByAuthor(authorId) {
  try {
    const plugins = await spiget.getAuthorResources(authorId, {
      page: 1,
      size: 10,
      sort: 'downloads'
    });
    console.log(plugins);
  } catch (error) {
    console.error('Error:', error);
  }
}`}
              language="javascript"
            />
          </div>

          <div className={styles.subsection}>
            <h3 className={styles.subsectionTitle}>Get Plugin Updates</h3>
            <p className={styles.description}>
              Check for updates to a specific plugin by its ID. This example demonstrates how to fetch the latest version details.
            </p>
            <CodeBlock
              code={`async function getPluginUpdates(pluginId) {
  try {
    const updates = await spiget.getResourceUpdates(pluginId);
    console.log(updates);
  } catch (error) {
    console.error('Error:', error);
  }
}`}
              language="javascript"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Docs;
