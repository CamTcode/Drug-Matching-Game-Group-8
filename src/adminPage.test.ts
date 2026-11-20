import type { FormEvent } from 'react';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAdminAuth } from './adminPage';
import { supabase } from './supabaseClient';

// Mock the Supabase client so tests run offline without network calls
vi.mock('./supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

describe('useAdminAuth', () => {
  const mockUser = { id: '123', email: 'admin@pharmacy.edu' } as User;
  const mockFormEvent = { preventDefault: vi.fn() } as unknown as FormEvent<HTMLFormElement>;

  beforeEach(() => {
    vi.clearAllMocks();
    // Default: no active session on load
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    });
  });

  it('starts logged out with empty fields', async () => {
    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(supabase.auth.getSession).toHaveBeenCalledTimes(1);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.statusText).toBe('');
  });

  it('restores an active session on initial load', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser } as Session },
      error: null,
    });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it('shows validation message if email or password is empty', async () => {
    const { result } = renderHook(() => useAdminAuth());

    await act(async () => {
      await result.current.handleLogin(mockFormEvent);
    });

    expect(result.current.statusText).toBe('Please enter both email and password.');
    expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
  });

  it('sets user and clears status on successful login', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: mockUser, session: {} as Session },
      error: null,
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail('  admin@pharmacy.edu  ');
      result.current.setPassword('secret123');
    });

    await act(async () => {
      await result.current.handleLogin(mockFormEvent);
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'admin@pharmacy.edu',
      password: 'secret123',
    });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.statusText).toBe('');
  });

  it('displays error message when login fails', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' } as AuthError,
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail('admin@pharmacy.edu');
      result.current.setPassword('wrongpass');
    });

    await act(async () => {
      await result.current.handleLogin(mockFormEvent);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.statusText).toBe('Login failed: Invalid login credentials');
  });

  it('clears user and fields on logout', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser } as Session },
      error: null,
    });
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
    });

    await act(async () => {
      await result.current.handleLogout();
    });

    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
    expect(result.current.user).toBeNull();
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.statusText).toBe('Logged out.');
  });
});
