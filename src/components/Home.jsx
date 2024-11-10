import { useState } from 'react';
import API from '../services/axios';

const Home = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleShortenUrl = async () => {
    if (!url) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Make a POST request to the backend for URL shortening
      const response = await API.post('http://localhost:8000/url-shortner/shorten', { originalUrl: url });

      if (!response.data.shortUrl) {
        throw new Error('Failed to shorten URL');
      }

      setShortenedUrl(response.data.shortUrl);  // Set the shortened URL
    } catch (error) {
      setError(error.message);  // Display error message if something goes wrong
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 w-4/6">
      <h1 className="text-3xl font-bold mb-6">Paste the URL to be shortened</h1>

      <div className="mb-4">
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter URL"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        onClick={handleShortenUrl}
        className="w-full bg-blue-500 text-white p-2 rounded-md"
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {shortenedUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Shortened URL:</h2>
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
