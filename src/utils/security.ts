
import DOMPurify from 'dompurify';

// Trusted domains for external resources
const TRUSTED_IMAGE_DOMAINS = [
  'upload.wikimedia.org',
  'i.pinimg.com',
  'easydrawingguides.com',
  'variety.com',
  'www.citypng.com',
  'gifer.com',
  'githubusercontent.com'
];

const TRUSTED_API_DOMAINS = [
  'api.github.com',
  'httpbin.org'
];

// Enhanced input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potential XSS vectors
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true
  });
  
  // Additional sanitization for common attack patterns
  return cleaned
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'span'],
    ALLOWED_ATTR: ['class'],
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });
};

// Enhanced input validation with security checks
export const validateInput = (input: string, maxLength: number = 1000): boolean => {
  if (!input || typeof input !== 'string') return false;
  if (input.length > maxLength) return false;
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script[^>]*>/i,
    /javascript:/i,
    /vbscript:/i,
    /on\w+\s*=/i,
    /<iframe[^>]*>/i,
    /<object[^>]*>/i,
    /<embed[^>]*>/i,
    /<link[^>]*>/i,
    /<meta[^>]*>/i,
    /data:text\/html/i,
    /&#x/i, // Hex encoded characters
    /&#\d/i, // Decimal encoded characters
    /%3C%73%63%72%69%70%74/i // URL encoded script
  ];
  
  const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(input));
  
  if (hasSuspiciousContent) {
    logSecurityEvent('suspicious_input_detected', { input: input.substring(0, 100) });
    return false;
  }
  
  return true;
};

// Enhanced URL validation with domain allowlisting
export const validateImageURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    
    // Only allow HTTPS in production
    if (location.protocol === 'https:' && urlObj.protocol !== 'https:') {
      return false;
    }
    
    // Check against trusted domains
    const isTrustedDomain = TRUSTED_IMAGE_DOMAINS.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    );
    
    if (!isTrustedDomain) {
      logSecurityEvent('untrusted_image_domain', { domain: urlObj.hostname });
      return false;
    }
    
    return true;
  } catch (error) {
    logSecurityEvent('invalid_url_format', { url });
    return false;
  }
};

export const validateURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const allowedDomains = [
      ...TRUSTED_API_DOMAINS,
      'wikipedia.org',
      'github.com',
      'stackoverflow.com',
      'medium.com',
      'kaggle.com',
      'arxiv.org',
      'youtube.com',
      'coursera.org',
      'edx.org'
    ];
    
    return allowedDomains.some(domain => 
      urlObj.hostname.endsWith(domain) || urlObj.hostname === domain
    );
  } catch {
    return false;
  }
};

// Enhanced data encryption with better error handling
export const encryptData = async (data: string): Promise<string> => {
  try {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Web Crypto API not available');
    }
    
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const key = await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      dataBuffer
    );
    
    const keyBuffer = await window.crypto.subtle.exportKey('raw', key);
    
    return JSON.stringify({
      encrypted: Array.from(new Uint8Array(encrypted)),
      key: Array.from(new Uint8Array(keyBuffer)),
      iv: Array.from(iv),
      timestamp: Date.now()
    });
  } catch (error) {
    logSecurityEvent('encryption_failed', { error: error.message });
    throw new Error('Encryption failed');
  }
};

export const decryptData = async (encryptedData: string): Promise<string> => {
  try {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Web Crypto API not available');
    }
    
    const { encrypted, key: keyArray, iv: ivArray, timestamp } = JSON.parse(encryptedData);
    
    // Check if data is too old (optional security measure)
    const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
    if (timestamp && Date.now() - timestamp > MAX_AGE) {
      throw new Error('Encrypted data too old');
    }
    
    const key = await window.crypto.subtle.importKey(
      'raw',
      new Uint8Array(keyArray),
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
    
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(ivArray) },
      key,
      new Uint8Array(encrypted)
    );
    
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    logSecurityEvent('decryption_failed', { error: error.message });
    return encryptedData; // Fallback to original data
  }
};

// Generate secure user ID with better entropy
export const generateSecureId = (): string => {
  try {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    
    // Fallback with higher entropy
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } catch {
    // Last resort fallback
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
};

// Enhanced rate limiter with security logging
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, number[]>();
  
  return (key: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      logSecurityEvent('rate_limit_exceeded', { key, attempts: recentAttempts.length });
      return false;
    }
    
    recentAttempts.push(now);
    attempts.set(key, recentAttempts);
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance
      cleanupOldAttempts(attempts, windowMs);
    }
    
    return true;
  };
};

// Security event logging
export const logSecurityEvent = (eventType: string, details: any) => {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    details
  };
  
  console.warn('Security Event:', event);
  
  // In production, send to your security monitoring service
  // fetch('/api/security-events', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event)
  // });
};

// Helper function to clean up old rate limit attempts
const cleanupOldAttempts = (attempts: Map<string, number[]>, windowMs: number) => {
  const now = Date.now();
  for (const [key, userAttempts] of attempts.entries()) {
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    if (recentAttempts.length === 0) {
      attempts.delete(key);
    } else {
      attempts.set(key, recentAttempts);
    }
  }
};

// Content Security Policy helper
export const addTrustedImageDomain = (domain: string): boolean => {
  if (validateDomain(domain)) {
    TRUSTED_IMAGE_DOMAINS.push(domain);
    return true;
  }
  return false;
};

const validateDomain = (domain: string): boolean => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return domainRegex.test(domain);
};

// Session security helpers
export const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array)).replace(/[+/=]/g, '');
};

export const validateSessionToken = (token: string): boolean => {
  return /^[A-Za-z0-9]{43}$/.test(token);
};
