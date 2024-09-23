import React, { createContext, useContext } from 'react';

// Create context
const Context = createContext();

// Provider component
export const Provider = ({ children }) => {
  const getLoginData = async () => {
    try {
      const response = await apiInstance.get('/login');
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching login data:', error.message);
      throw error;
    }
  };

  const postSignupData = async (signupData) => {
    try {
      const response = await apiInstance.post('/signup', signupData);
      return response.data;
    } catch (error) {
      console.error('Error posting signup data:', error.message);
      throw error;
    }
  };

  // Add more API functions as needed

  return (
    <Context.Provider value={{ getLoginData, postSignupData }}>
      {children}
    </Context.Provider>
  );
};

export const useApi = () => {
  return useContext(Context);
};
