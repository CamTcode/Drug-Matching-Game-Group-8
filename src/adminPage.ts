import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');

  // Check for an existing session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    checkSession();
  }, []);

  // Handle Login
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password) {
      setStatusText('Please enter both email and password.');
      return;
    }

    setStatusText('Logging in...');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setStatusText(`Login failed: ${error.message}`);
    } else {
      setUser(data.user);
      setStatusText('');
    }
  }

  // Handle Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setEmail('');
    setPassword('');
    setStatusText('Logged out.');
  }

  return {
    user,
    email,
    setEmail,
    password,
    setPassword,
    statusText,
    handleLogin,
    handleLogout,
  };
}