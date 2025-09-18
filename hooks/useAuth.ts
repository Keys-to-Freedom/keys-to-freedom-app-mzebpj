
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name?: string;
  isAdmin?: boolean;
  joinedAt: Date;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Bitte gib eine gültige E-Mail-Adresse ein');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split('@')[0],
        isAdmin: email.includes('admin'), // Simple admin check for demo
        joinedAt: new Date()
      };

      setUser(newUser);
      console.log('User logged in:', newUser);
      
      // Store user data locally (in a real app, use secure storage)
      // AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen';
      setError(errorMessage);
      console.error('Login error:', errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate email format
      if (!validateEmail(email)) {
        throw new Error('Bitte gib eine gültige E-Mail-Adresse ein');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // In a real app, this would make an API call to your backend
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        isAdmin: false,
        joinedAt: new Date()
      };

      setUser(newUser);
      console.log('User registered:', newUser);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registrierung fehlgeschlagen';
      setError(errorMessage);
      console.error('Registration error:', errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    console.log('User logged out');
    // AsyncStorage.removeItem('user');
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-login check on app start
  useEffect(() => {
    const checkAutoLogin = async () => {
      try {
        // In a real app, check AsyncStorage for stored user data
        // const storedUser = await AsyncStorage.getItem('user');
        // if (storedUser) {
        //   setUser(JSON.parse(storedUser));
        // }
      } catch (error) {
        console.error('Auto-login check failed:', error);
      }
    };

    checkAutoLogin();
  }, []);

  return {
    user,
    isLoading,
    error,
    isLoggedIn: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout,
    clearError,
    validateEmail
  };
};
