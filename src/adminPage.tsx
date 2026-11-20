import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export default function AdminLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('');

  // Check if you already have an active session on page load
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
  const handleLogin = async (e: React.FormEvent) => {
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
  };

  // Handle Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEmail('');
    setPassword('');
    setStatusText('Logged out.');
  };

  return (
    <div>
      <h1>Admin Login</h1>

      {!user ? (
        /* Login Section */
        <form onSubmit={handleLogin}>
          <p>Sign in with your Supabase account</p>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Log In</button>
        </form>
      ) : (
        /* Upload / Logged-In Section */
        <div>
          <p>Logged in as: {user.email}</p>
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}

      {statusText && <p>{statusText}</p>}

      <a href="/">Back to Game</a>
    </div>
  );
}