// API configuration
const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://192.168.29.155:3000/api'  // Development - Use your computer's IP
    : 'https://your-production-api.com/api', // Production
  TIMEOUT: 10000, // 10 seconds
};

// Create a fetch wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config = {
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`Making API request to: ${url}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    console.log(`API response status: ${response.status}`);

    const data = await response.json();
    
    if (!response.ok) {
      console.log(`API error response:`, data);
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.log(`API request error:`, error);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection');
    }
    
    // Network error
    if (error.message === 'Network request failed') {
      throw new Error(`Network error - Cannot connect to ${API_CONFIG.BASE_URL}. Make sure backend is running on port 3000.`);
    }
    
    // Connection refused
    if (error.message.includes('ECONNREFUSED') || error.message.includes('ERR_NETWORK')) {
      throw new Error(`Connection refused - Backend server not reachable at ${API_CONFIG.BASE_URL}`);
    }
    
    throw error;
  }
};

// API methods
export const API = {
  // Authentication endpoints
  auth: {
    signup: (userData) => 
      apiRequest('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    login: (credentials) =>
      apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    getProfile: (token) =>
      apiRequest('/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },
};

export default API_CONFIG;