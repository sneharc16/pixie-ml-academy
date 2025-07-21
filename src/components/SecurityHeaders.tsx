
import { useEffect } from 'react';

const SecurityHeaders = () => {
  useEffect(() => {
    // Add security-related meta tags if they don't exist
    const addMetaTag = (name: string, content: string) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    };

    // Generate a nonce for inline scripts if needed
    const nonce = btoa(Math.random().toString()).substring(0, 16);
    
    // Strengthened Content Security Policy
    addMetaTag('Content-Security-Policy', 
      "default-src 'self'; " +
      "script-src 'self' 'nonce-" + nonce + "' https://cdn.jsdelivr.net https://unpkg.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
      "img-src 'self' data: https://trusted-images.com https://upload.wikimedia.org https://i.pinimg.com https://easydrawingguides.com https://variety.com https://www.citypng.com https://gifer.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' https://api.trusted-domain.com; " +
      "media-src 'self' blob:; " +
      "object-src 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self'; " +
      "frame-ancestors 'none'; " +
      "upgrade-insecure-requests; " +
      "block-all-mixed-content;"
    );

    // Enhanced security headers
    addMetaTag('X-Content-Type-Options', 'nosniff');
    addMetaTag('X-Frame-Options', 'DENY');
    addMetaTag('X-XSS-Protection', '1; mode=block');
    addMetaTag('Referrer-Policy', 'strict-origin-when-cross-origin');
    addMetaTag('Permissions-Policy', 
      'geolocation=(), microphone=(), camera=(), magnetometer=(), gyroscope=(), speaker=(), payment=(), usb=(), bluetooth=()'
    );
    
    // Add HSTS header simulation (would be better handled server-side)
    addMetaTag('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Add CSP violation reporting
    const reportViolations = (event: SecurityPolicyViolationEvent) => {
      console.warn('CSP Violation:', {
        violatedDirective: event.violatedDirective,
        blockedURI: event.blockedURI,
        lineNumber: event.lineNumber,
        columnNumber: event.columnNumber,
        sourceFile: event.sourceFile
      });
      
      // In production, send to your logging service
      // fetch('/api/csp-violation', { method: 'POST', body: JSON.stringify(event) });
    };
    
    document.addEventListener('securitypolicyviolation', reportViolations);

    // Set secure attributes for existing cookies
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.trim().split('=');
      if (name && !cookie.includes('Secure') && location.protocol === 'https:') {
        const value = document.cookie.match(new RegExp(name + '=([^;]+)'))?.[1] || '';
        document.cookie = `${name}=${value}; Secure; SameSite=Strict; Path=/; HttpOnly`;
      }
    });

    return () => {
      document.removeEventListener('securitypolicyviolation', reportViolations);
    };
  }, []);

  return null;
};

export default SecurityHeaders;
