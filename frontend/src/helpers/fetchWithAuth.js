const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token'); // Lấy token từ Local Storage
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Thêm token vào headers
      ...options.headers,
    };
  
    const response = await fetch(url, { ...options, headers });
    return response;
  };
  
  export default fetchWithAuth;
  