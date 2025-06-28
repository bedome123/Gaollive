import { useState } from 'react';
import AdminPanel from '@/components/admin-panel';

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  const handleAuth = async (key: string) => {
    // In a real implementation, this would verify the API key
    // For demo purposes, we'll accept any non-empty key
    if (key.length > 0) {
      setAdminKey(key);
      setIsAuthorized(true);
      // Store in localStorage for session persistence
      localStorage.setItem('admin_key', key);
    }
  };

  // Check for existing auth on mount
  useState(() => {
    const storedKey = localStorage.getItem('admin_key');
    if (storedKey) {
      setAdminKey(storedKey);
      setIsAuthorized(true);
    }
  });

  return (
    <AdminPanel 
      isAuthorized={isAuthorized} 
      onAuth={handleAuth}
    />
  );
}