const APIUrl = 'http://128.199.64.53:5003/api/v1';
const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'http://localhost:3000';

export { baseUrl, APIUrl };
