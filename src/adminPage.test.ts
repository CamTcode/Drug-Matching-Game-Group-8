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
    const mockUser = { id: '123', email: 'admin@pharmacy.edu' } as any;
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser } as any },
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
      await result.current.handleLogin({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.statusText).toBe('Please enter both email and password.');
    expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
  });

  it('sets user and clears status on successful login', async () => {
    const mockUser = { id: '123', email: 'admin@pharmacy.edu' } as any;
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: mockUser, session: {} as any },
      error: null,
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail('  admin@pharmacy.edu  ');
      result.current.setPassword('secret123');
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: vi.fn() } as any);
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
      error: { message: 'Invalid login credentials' } as any,
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail('admin@pharmacy.edu');
      result.current.setPassword('wrongpass');
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault: vi.fn() } as any);
    });

    expect(result.current.user).toBeNull();
    expect(result.current.statusText).toBe('Login failed: Invalid login credentials');
  });

  it('clears user and fields on logout', async () => {
    const mockUser = { id: '123', email: 'admin@pharmacy.edu' } as any;
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser } as any },
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