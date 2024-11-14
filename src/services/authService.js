const API_BASE_URL = 'https://carmanagementsystembackend.onrender.com/api/users';  // Your backend API base URL

export const login = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  localStorage.setItem('jwtToken', data.token);  // Save JWT token for session management
  console.log("login function end")
  console.log(data)
  return data;
};

export const signup = async (userDetails) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || 'Failed to signup');
    }
  
    return data;  // Return the response data
  };
  
