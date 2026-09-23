import { SavedHistoryItem } from './types';

const STORAGE_KEY = 'pocketsmart_history_v1';
const USER_KEY = 'pocketsmart_user_v1';

export function getSavedHistory(): SavedHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading history:', e);
    return [];
  }
}

export function saveHistoryItem(item: Omit<SavedHistoryItem, 'id' | 'timestamp'>): SavedHistoryItem {
  const newItem: SavedHistoryItem = {
    ...item,
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getSavedHistory();
      const updated = [newItem, ...existing].slice(0, 50); // keep up to 50 items
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving history item:', e);
    }
  }

  return newItem;
}

export function deleteHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getSavedHistory();
    const updated = existing.filter((it) => it.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting history item:', e);
  }
}

export interface UserSession {
  email: string;
  name: string;
  isLoggedIn: boolean;
  token?: string;
}

export function getCurrentUser(): UserSession {
  if (typeof window === 'undefined') {
    return { email: 'guest@pocketsmart.ai', name: 'Guest Explorer', isLoggedIn: false };
  }
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // fallback
  }
  return { email: 'guest@pocketsmart.ai', name: 'Guest Explorer', isLoggedIn: false };
}

export function setCurrentUser(user: UserSession): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user session:', e);
  }
}

export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Error logging out:', e);
  }
}
