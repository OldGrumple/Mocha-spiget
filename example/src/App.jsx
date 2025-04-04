import { useState, useEffect } from 'react'
import { marked } from 'marked'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Docs from './Docs'

// Logo URL (relative to public folder)
const logoPath = 'Logo.png'

// Configure marked to handle GitHub Flavored Markdown
marked.setOptions({
  breaks: true, // Adds <br> on single line breaks
  gfm: true,    // GitHub Flavored Markdown
  headerIds: false, // Disable header IDs to avoid conflicts
  mangle: false // Disable mangling to preserve text
})

function App() {
  const [resourceId, setResourceId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [resourceData, setResourceData] = useState(null)
  const [topResources, setTopResources] = useState([])
  const [error, setError] = useState(null)
  const [spiget, setSpiget] = useState(null)
  const [activeTab, setActiveTab] = useState('formatted')
  const [activeSearchTab, setActiveSearchTab] = useState('id')
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [copyStatus, setCopyStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [jsonModalData, setJsonModalData] = useState(null)

  useEffect(() => {
    const initSpiget = async () => {
      try {
        const { SpigetAPI } = await import('mocha-spiget')
        setSpiget(new SpigetAPI())
      } catch (error) {
        console.error('Error initializing Spiget:', error)
        setError('Failed to initialize Spiget API')
      }
    }
    initSpiget()
  }, [])

  useEffect(() => {
    if (resourceId) {
      handleIdSearch();
    }
  }, [resourceId]);

  const handleIdSearch = async () => {
    if (!spiget) return
    setIsLoading(true)
    
    try {
      setError(null)
      setDownloadUrl(null)
      setCopyStatus('')
      setTopResources([])
      
      const resource = await spiget.getResource(parseInt(resourceId))
      
      // Get the download URL using the correct method
      try {
        // The download URL is available in the resource.file.url property
        if (resource.file && resource.file.url) {
          const baseUrl = 'https://api.spiget.org/v2/resources/';
          const downloadUrl = `${baseUrl}${resourceId}/download`;
          setDownloadUrl(downloadUrl);
        }
      } catch (e) {
        console.warn('Error setting download URL:', e)
      }
      
      // Log the resource data to see its structure
      console.log('Resource data:', resource)
      
      // Decode base64 description if it exists
      if (resource.description) {
        try {
          resource.description = atob(resource.description)
        } catch (e) {
          console.warn('Failed to decode description:', e)
        }
      }
      
      // Get additional data if needed
      let authorData = null
      let categoryData = null
      let versionData = null
      
      try {
        // Get author data if author is an object with id
        if (resource.author && typeof resource.author === 'object' && resource.author.id) {
          authorData = await spiget.getAuthor(resource.author.id, 'id,name')
        }
        
        // Get category data if category is an object with id
        if (resource.category && typeof resource.category === 'object' && resource.category.id) {
          categoryData = await spiget.getCategory(resource.category.id, 'id,name')
        }
        
        // Get version data if version is an object with id
        if (resource.version && typeof resource.version === 'object' && resource.version.id) {
          versionData = await spiget.getResourceVersion(parseInt(resourceId), resource.version.id)
        }
      } catch (e) {
        console.warn('Error fetching additional data:', e)
      }
      
      // Create a safe copy of the resource data with only primitive values
      const safeResource = {
        id: resource.id,
        name: resource.name || 'Unknown',
        description: resource.description || 'No description available',
        downloads: resource.downloads || 0,
        // Handle updates as an array
        updates: Array.isArray(resource.updates) ? resource.updates.length : 0,
        // Use author data from API if available, otherwise use the resource author
        author: authorData ? authorData.name : 
          (resource.author ? 
            (typeof resource.author === 'object' ? resource.author.name : resource.author) : 
            'Unknown Author'),
        // Use category data from API if available, otherwise use the resource category
        category: categoryData ? categoryData.name : 
          (resource.category ? 
            (typeof resource.category === 'object' ? resource.category.name : resource.category) : 
            'Uncategorized'),
        // Use version data from API if available, otherwise use the resource version
        version: versionData ? versionData.name : 
          (resource.version ? 
            (typeof resource.version === 'object' ? resource.version.name : resource.version) : 
            'Unknown'),
        // Handle rating
        rating: {
          average: resource.rating && typeof resource.rating === 'object' ? resource.rating.average || 0 : 0,
          count: resource.rating && typeof resource.rating === 'object' ? resource.rating.count || 0 : 0
        },
        // Handle testedVersions as an array
        testedVersions: Array.isArray(resource.testedVersions) ? resource.testedVersions : [],
        // Handle versions as an array
        versions: Array.isArray(resource.versions) ? resource.versions.map(v => ({
          id: v.id || 0,
          name: v.name || 'Unknown',
          releaseDate: v.releaseDate || null
        })) : [],
        // Handle updates as an array of objects
        updateObjects: Array.isArray(resource.updates) ? resource.updates.map(u => ({
          id: u.id || 0,
          title: u.title || 'Unknown',
          description: u.description || '',
          date: u.date || null
        })) : [],
        // Handle reviews as an array
        reviews: Array.isArray(resource.reviews) ? resource.reviews.map(r => ({
          id: r.id || 0,
          rating: r.rating || 0,
          message: r.message || '',
          user: r.user || 'Unknown',
          date: r.date || null
        })) : [],
        icon: resource.icon && typeof resource.icon === 'object' && resource.icon.url ? resource.icon.url : null,
        price: resource.price || 0,
        updateDate: resource.updateDate || null,
        // Handle release date
        versionReleaseDate: versionData ? versionData.releaseDate : 
          (resource.version && typeof resource.version === 'object' ? resource.version.releaseDate : 
            (resource.releaseDate || null)),
        contributors: resource.contributors || 'None',
        likes: resource.likes || 0,
        external: resource.external || false,
        file: resource.file || null,
        links: resource.links || {}
      }
      
      // Log the processed data to verify
      console.log('Processed resource data:', safeResource)
      
      setResourceData(safeResource)
    } catch (err) {
      setError(err.message)
      setResourceData(null)
      setDownloadUrl(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTopDownloaded = async () => {
    if (!spiget) return;
    setIsLoading(true);
    
    try {
      setError(null);
      setResourceData(null);
      setDownloadUrl(null);
      setCopyStatus('');
      
      const resources = await spiget.getResources({
        size: 10,
        sort: '-downloads',
        fields: 'id,name,tag,downloads,rating,author,icon'
      });

      // Process resources and fetch author details
      const processedResources = await Promise.all(resources.map(async (resource) => {
        let authorName = 'Unknown';
        
        // If author is an object with id, fetch the author details
        if (resource.author && typeof resource.author === 'object' && resource.author.id) {
          try {
            const authorData = await spiget.getAuthor(resource.author.id, 'id,name');
            authorName = authorData.name || 'Unknown';
          } catch (e) {
            console.warn('Error fetching author:', e);
          }
        } else if (resource.author) {
          // If author is a string or has a name property
          authorName = typeof resource.author === 'string' ? resource.author : resource.author.name || 'Unknown';
        }

        return {
          ...resource,
          id: resource.id || 0,
          name: resource.name || 'Unknown',
          author: { name: authorName },
          downloads: resource.downloads || 0,
          rating: resource.rating || { average: 'N/A', count: 0 },
          icon: resource.icon || { url: null }
        };
      }));

      setTopResources(processedResources);
    } catch (err) {
      setError(err.message);
      setTopResources([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTextSearch = async () => {
    if (!spiget || !searchQuery.trim()) return;
    setIsLoading(true);
    
    try {
      setError(null);
      setResourceData(null);
      setDownloadUrl(null);
      setCopyStatus('');
      
      const resources = await spiget.searchResources(searchQuery, {
        size: 10,
        fields: 'id,name,tag,downloads,rating,author,icon'
      });

      // Process resources and fetch author details
      const processedResources = await Promise.all(resources.map(async (resource) => {
        let authorName = 'Unknown';
        
        // If author is an object with id, fetch the author details
        if (resource.author && typeof resource.author === 'object' && resource.author.id) {
          try {
            const authorData = await spiget.getAuthor(resource.author.id, 'id,name');
            authorName = authorData.name || 'Unknown';
          } catch (e) {
            console.warn('Error fetching author:', e);
          }
        } else if (resource.author) {
          // If author is a string or has a name property
          authorName = typeof resource.author === 'string' ? resource.author : resource.author.name || 'Unknown';
        }

        return {
          ...resource,
          id: resource.id || 0,
          name: resource.name || 'Unknown',
          author: { name: authorName },
          downloads: resource.downloads || 0,
          rating: resource.rating || { average: 'N/A', count: 0 },
          icon: resource.icon || { url: null }
        };
      }));

      setTopResources(processedResources);
    } catch (err) {
      setError(err.message);
      setTopResources([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleResourceClick = async (id) => {
    if (!id) return;
    setResourceId(id.toString());
    setActiveSearchTab('id');
  }

  const handleCopyUrl = async () => {
    if (downloadUrl) {
      try {
        await navigator.clipboard.writeText(downloadUrl)
        setCopyStatus('Copied!')
        setTimeout(() => setCopyStatus(''), 2000)
      } catch (err) {
        setCopyStatus('Failed to copy')
        setTimeout(() => setCopyStatus(''), 2000)
      }
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown'
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  // Component to safely render HTML and Markdown content
  const HTMLContent = ({ content }) => {
    if (!content) return <p className="text-gray-400">No description available</p>;
    
    // Filter out image tags to avoid CORS issues
    let filteredContent = content
      .replace(/<img[^>]*>/g, '') // Remove image tags
      .replace(/\[â.*?\]/g, '')   // Remove [â...] patterns
      .replace(/\[IMG\]/g, '')    // Remove [IMG] text
      .replace(/â/g, '');         // Remove remaining â characters
    
    // Check if content is markdown by looking for common markdown syntax
    const isMarkdown = /[#*_[\n`]/.test(filteredContent);
    
    // If it's markdown, convert it to HTML
    if (isMarkdown) {
      filteredContent = marked(filteredContent);
    }
    
    return (
      <div 
        className="html-content"
        dangerouslySetInnerHTML={{ __html: filteredContent }}
      />
    );
  };

  const renderFormattedView = () => {
    if (!resourceData) return null

    return (
      <div className="bg-dark border border-gray-700 rounded-xl p-5 flex flex-col h-full relative overflow-hidden mb-8">
        <div className="flex items-start gap-4 mb-6">
          {resourceData.icon && (
            <img 
              src={`https://www.spigotmc.org${resourceData.icon}`} 
              alt={`${resourceData.name} icon`} 
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
          <div className="flex-1 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-1">{resourceData.name}</h2>
            <div className="text-gray-400 text-sm">
              By <span className="text-white">{resourceData.author || 'Unknown Author'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-6 my-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span> 
            <span className="text-white">{resourceData.rating?.average || 'N/A'}</span>
            <span className="text-gray-400">({resourceData.rating?.count || '0'} ratings)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white">{resourceData.downloads || '0'}</span>
            <span className="text-gray-400">downloads</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white">{resourceData.updates || '0'}</span>
            <span className="text-gray-400">updates</span>
          </div>
        </div>
        
        <div className="my-6 leading-relaxed text-gray-200">
          <HTMLContent content={resourceData.description || 'No description available'} />
        </div>
        
        <div className="grid gap-4 mt-6 pt-6 border-t border-gray-700" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Category</div>
            <div className="text-white">{resourceData.category || 'Uncategorized'}</div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Version</div>
            <div className="text-white">{resourceData.version || 'Unknown'}</div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Released</div>
            <div className="text-white">{formatDate(resourceData.versionReleaseDate)}</div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Last Updated</div>
            <div className="text-white">{formatDate(resourceData.updateDate)}</div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Tested Versions</div>
            <div className="text-white">
              {Array.isArray(resourceData.testedVersions) && resourceData.testedVersions.length > 0
                ? resourceData.testedVersions.join(', ')
                : 'None specified'}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Contributors</div>
            <div className="text-white">{resourceData.contributors || 'None'}</div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">Price</div>
            <div className="text-white">
              {resourceData.price > 0 ? `$${resourceData.price}` : 'Free'}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="text-gray-400 text-sm">External</div>
            <div className="text-white">
              {resourceData.external ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSearchTabs = () => {
    return (
      <div className="search-section">
        <div className="search-tabs">
          <button 
            onClick={() => {
              setActiveSearchTab('id')
              setTopResources([])
              setResourceData(null)
            }}
            className={activeSearchTab === 'id' ? 'active' : ''}
          >
            Search by ID
          </button>
          <button 
            onClick={() => {
              setActiveSearchTab('top')
              handleTopDownloaded()
            }}
            className={activeSearchTab === 'top' ? 'active' : ''}
          >
            Most Downloaded
          </button>
          <button 
            onClick={() => {
              setActiveSearchTab('text')
              setTopResources([])
              setResourceData(null)
            }}
            className={activeSearchTab === 'text' ? 'active' : ''}
          >
            Text Search
          </button>
        </div>

        {activeSearchTab === 'id' && (
          <div className="search-input-container">
            <input
              type="number"
              value={resourceId}
              onChange={(e) => setResourceId(e.target.value)}
              placeholder="Enter resource ID"
            />
            <button onClick={handleIdSearch} disabled={!spiget || isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        )}

        {activeSearchTab === 'text' && (
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plugins..."
            />
            <button onClick={handleTextSearch} disabled={!spiget || isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        )}

        {topResources.length > 0 && (
          <div className="mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {topResources.map((resource) => (
              <div
                key={resource.id}
                onClick={() => handleResourceClick(resource.id)}
                className="resource-card"
              >
                <div className="flex items-start gap-3">
                  <div>
                    <h3>{resource.name}</h3>
                    <div className="author">
                      By {resource.author?.name || (typeof resource.author === 'object' ? resource.author.name : resource.author) || 'Unknown'}
                    </div>
                    <div className="stats">
                      <span>
                        <span className="star">★</span> {resource.rating?.average || 'N/A'}
                      </span>
                      <span>
                        ↓ {resource.downloads || '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Add this new component for the JSON modal
  const JsonModal = ({ data, onClose }) => {
    if (!data) return null;
    
    return (
      <div className="modal-overlay" onClick={onClose} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div className="modal-content" onClick={e => e.stopPropagation()} style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflow: 'auto',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.5em',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ×
          </button>
          <pre style={{ margin: '1rem 0 0 0' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <div className="flex flex-col gap-4 items-center w-full max-w-7xl px-4">
        <nav className="sticky top-0 z-50 w-full flex justify-between p-4 bg-dark-darker rounded-lg mb-4 backdrop-blur-sm bg-opacity-90">
          <Link to="/" className="text-primary hover:underline">Home</Link>
          <Link to="/docs" className="text-primary hover:underline">Docs</Link>
        </nav>
        <Routes>
          <Route path="/docs" element={<Docs />} />
          <Route path="/" element={
            <>
              <div className="flex justify-center mb-4 w-full rounded-lg p-2">
                <img src={logoPath} alt="Mocha-spiget Logo" className="w-[150px] h-auto mb-2 transition-transform duration-300 hover:scale-105" />
              </div>
              
              <div className="bg-dark p-6 rounded-lg mb-8 w-full">
                <h2 className="text-2xl font-bold text-primary mb-4">About Mocha-Spiget Demo</h2>
                <p className="mb-4">
                  This demo showcases the <strong>mocha-spiget</strong> package, which provides an easy way to interact with the SpigotMC API. 
                  You can search for plugins by ID, view the most downloaded plugins, and perform text searches to find plugins by name or description.
                </p>
                <p className="mb-4">
                  Simply enter a resource ID in the search box, or explore the top downloaded plugins to see detailed information about each plugin, 
                  including author, downloads, ratings, and more. The demo also includes a formatted view and raw JSON view for each plugin.
                </p>
                
                <div className="bg-dark-darker p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">How to Use</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-200">
                    <li>Use the text search to find plugins by name or description</li>
                    <li>Find a plugin you're interested in</li>
                    <li>Click on the plugin to view detailed information</li>
                  </ol>
                </div>
                
                <div className="bg-dark-darker p-4 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">Example Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="p-2 rounded bg-dark">EssentialsX: <span className="text-primary">9089</span></div>
                    <div className="p-2 rounded bg-dark">WorldEdit: <span className="text-primary">12662</span></div>
                    <div className="p-2 rounded bg-dark">LuckPerms: <span className="text-primary">28140</span></div>
                    <div className="p-2 rounded bg-dark">Vault: <span className="text-primary">34315</span></div>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-6xl">
                {renderSearchTabs()}
                {error && <div className="bg-red-900/50 text-red-200 p-4 rounded-lg mt-4 w-full">{error}</div>}
              </div>
              
              {resourceData && (
                <div className="w-full max-w-6xl flex flex-col items-center px-2">
                  <div className="flex gap-4 mb-8 justify-start w-full p-0 relative">
                    <button
                      onClick={() => setActiveTab('formatted')}
                      className={`py-2 px-4 rounded-lg cursor-pointer border transition-all ${
                        activeTab === 'formatted' 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-dark border-gray-700 text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      Formatted View
                    </button>
                    <button
                      onClick={() => setActiveTab('raw')}
                      className={`py-2 px-4 rounded-lg cursor-pointer border transition-all ${
                        activeTab === 'raw' 
                          ? 'bg-primary text-white border-primary' 
                          : 'bg-dark border-gray-700 text-gray-400 hover:bg-gray-800'
                      }`}
                    >
                      Raw JSON
                    </button>
                  </div>
                  
                  <div className="w-full mt-8 text-left">
                    {activeTab === 'formatted' ? (
                      renderFormattedView()
                    ) : (
                      <pre className="bg-dark-darker p-4 rounded-lg overflow-x-auto">
                        {JSON.stringify(resourceData, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              {/* Add the JSON modal */}
              <JsonModal 
                data={jsonModalData} 
                onClose={() => setJsonModalData(null)} 
              />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App 