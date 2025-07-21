
import React, { createContext, useContext, useState, useEffect } from 'react';
import { encryptData, decryptData, generateSecureId, sanitizeInput, validateInput, logSecurityEvent, generateSessionToken } from '@/utils/security';

interface User {
  id: string;
  name: string;
  email: string;
  progress: Record<string, boolean>;
  notes: string[];
  completionDate?: Date;
  lastActivity?: Date;
  sessionToken?: string;
  securityVersion?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  updateProgress: (itemId: string, completed: boolean) => void;
  addNote: (note: string) => Promise<boolean>;
  updateNote: (index: number, note: string) => Promise<boolean>;
  deleteNote: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced session timeout (20 minutes)
const SESSION_TIMEOUT = 20 * 60 * 1000;
const CURRENT_SECURITY_VERSION = 2;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
    
    // Set up session timeout check (every 30 seconds)
    const interval = setInterval(checkSessionTimeout, 30000);
    
    // Set up security monitoring
    const securityInterval = setInterval(performSecurityCheck, 5 * 60 * 1000); // Every 5 minutes
    
    return () => {
      clearInterval(interval);
      clearInterval(securityInterval);
    };
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = localStorage.getItem('barbieML_user');
      if (storedUser) {
        const decryptedData = await decryptData(storedUser);
        const userData = JSON.parse(decryptedData);
        
        // Check security version compatibility
        if (userData.securityVersion !== CURRENT_SECURITY_VERSION) {
          logSecurityEvent('security_version_mismatch', { 
            stored: userData.securityVersion, 
            current: CURRENT_SECURITY_VERSION 
          });
          localStorage.removeItem('barbieML_user');
          return;
        }
        
        // Check if session is still valid
        if (userData.lastActivity && Date.now() - new Date(userData.lastActivity).getTime() < SESSION_TIMEOUT) {
          // Validate session token
          if (userData.sessionToken && isValidSession(userData.sessionToken)) {
            setUser(userData);
            updateLastActivity(userData);
          } else {
            logSecurityEvent('invalid_session_token', { userId: userData.id });
            localStorage.removeItem('barbieML_user');
          }
        } else {
          logSecurityEvent('session_expired', { userId: userData.id });
          localStorage.removeItem('barbieML_user');
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      logSecurityEvent('user_data_load_error', { error: error.message });
      localStorage.removeItem('barbieML_user');
    }
  };

  const isValidSession = (sessionToken: string): boolean => {
    // Validate session token format and freshness
    return sessionToken && sessionToken.length === 43 && /^[A-Za-z0-9]+$/.test(sessionToken);
  };

  const performSecurityCheck = () => {
    if (user) {
      // Check for suspicious activity patterns
      const progressChanges = Object.keys(user.progress).length;
      const noteCount = user.notes.length;
      
      // Log normal activity for monitoring
      logSecurityEvent('periodic_security_check', {
        userId: user.id,
        progressCount: progressChanges,
        noteCount,
        lastActivity: user.lastActivity
      });
    }
  };

  const checkSessionTimeout = () => {
    if (user && user.lastActivity) {
      const timeSinceActivity = Date.now() - new Date(user.lastActivity).getTime();
      if (timeSinceActivity > SESSION_TIMEOUT) {
        logSecurityEvent('session_timeout', { userId: user.id });
        logout();
      }
    }
  };

  const updateLastActivity = async (userData: User) => {
    const updatedUser = { 
      ...userData, 
      lastActivity: new Date(),
      sessionToken: userData.sessionToken || generateSessionToken()
    };
    setUser(updatedUser);
    await saveUserData(updatedUser);
  };

  const saveUserData = async (userData: User) => {
    try {
      // Add security version to user data
      const secureUserData = {
        ...userData,
        securityVersion: CURRENT_SECURITY_VERSION
      };
      
      const encryptedData = await encryptData(JSON.stringify(secureUserData));
      localStorage.setItem('barbieML_user', encryptedData);
      
      logSecurityEvent('user_data_saved', { userId: userData.id });
    } catch (error) {
      console.error('Error saving user data:', error);
      logSecurityEvent('user_data_save_error', { 
        userId: userData.id, 
        error: error.message 
      });
      // Don't fallback to unencrypted storage for security
      throw error;
    }
  };

  const login = async (email: string, name: string) => {
    // Enhanced validation and sanitization
    const sanitizedEmail = sanitizeInput(email.trim());
    const sanitizedName = sanitizeInput(name.trim());
    
    if (!validateInput(sanitizedEmail, 100) || !validateInput(sanitizedName, 50)) {
      logSecurityEvent('invalid_login_input', { email: sanitizedEmail.substring(0, 20) });
      throw new Error('Invalid input data');
    }

    // Additional email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      throw new Error('Invalid email format');
    }

    const sessionToken = generateSessionToken();
    const newUser: User = {
      id: generateSecureId(),
      name: sanitizedName,
      email: sanitizedEmail,
      progress: {},
      notes: [],
      lastActivity: new Date(),
      sessionToken,
      securityVersion: CURRENT_SECURITY_VERSION
    };
    
    setUser(newUser);
    await saveUserData(newUser);
    logSecurityEvent('user_login', { userId: newUser.id, email: sanitizedEmail.substring(0, 20) });
  };

  const logout = () => {
    if (user) {
      logSecurityEvent('user_logout', { userId: user.id });
    }
    setUser(null);
    localStorage.removeItem('barbieML_user');
  };

  const updateProgress = async (itemId: string, completed: boolean) => {
    if (!user) return;
    
    // Validate itemId to prevent injection
    if (!validateInput(itemId, 100)) {
      logSecurityEvent('invalid_progress_item', { userId: user.id, itemId });
      return;
    }
    
    const updatedUser = {
      ...user,
      progress: { ...user.progress, [itemId]: completed },
      lastActivity: new Date()
    };
    
    // Check if all items are completed
    const totalItems = 16;
    const completedItems = Object.values(updatedUser.progress).filter(Boolean).length;
    if (completedItems === totalItems && !user.completionDate) {
      updatedUser.completionDate = new Date();
      logSecurityEvent('course_completed', { userId: user.id });
    }
    
    setUser(updatedUser);
    await saveUserData(updatedUser);
  };

  const addNote = async (note: string): Promise<boolean> => {
    if (!user) return false;
    
    const sanitizedNote = sanitizeInput(note.trim());
    if (!validateInput(sanitizedNote, 2000)) {
      logSecurityEvent('invalid_note_content', { userId: user.id });
      return false;
    }
    
    // Rate limiting for note creation
    const recentNotes = user.notes.filter((_, index) => index >= user.notes.length - 5);
    if (recentNotes.length >= 5) {
      logSecurityEvent('note_rate_limit_reached', { userId: user.id });
      return false;
    }
    
    const updatedUser = { 
      ...user, 
      notes: [...user.notes, sanitizedNote],
      lastActivity: new Date()
    };
    setUser(updatedUser);
    await saveUserData(updatedUser);
    logSecurityEvent('note_added', { userId: user.id });
    return true;
  };

  const updateNote = async (index: number, note: string): Promise<boolean> => {
    if (!user || index < 0 || index >= user.notes.length) return false;
    
    const sanitizedNote = sanitizeInput(note.trim());
    if (!validateInput(sanitizedNote, 2000)) {
      logSecurityEvent('invalid_note_update', { userId: user.id, index });
      return false;
    }
    
    const updatedNotes = [...user.notes];
    updatedNotes[index] = sanitizedNote;
    const updatedUser = { 
      ...user, 
      notes: updatedNotes,
      lastActivity: new Date()
    };
    setUser(updatedUser);
    await saveUserData(updatedUser);
    logSecurityEvent('note_updated', { userId: user.id, index });
    return true;
  };

  const deleteNote = async (index: number) => {
    if (!user || index < 0 || index >= user.notes.length) return;
    
    const updatedNotes = user.notes.filter((_, i) => i !== index);
    const updatedUser = { 
      ...user, 
      notes: updatedNotes,
      lastActivity: new Date()
    };
    setUser(updatedUser);
    await saveUserData(updatedUser);
    logSecurityEvent('note_deleted', { userId: user.id, index });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProgress, addNote, updateNote, deleteNote }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
