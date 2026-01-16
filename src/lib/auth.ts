import bcrypt from 'bcryptjs';
import type { AstroCookies } from 'astro';
import db from './db';

export interface User {
  id: number;
  username: string;
  email: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function setAuthCookie(cookies: AstroCookies, userId: number) {
  cookies.set('userId', userId.toString(), {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export function clearAuthCookie(cookies: AstroCookies) {
  cookies.delete('userId', { path: '/' });
}

export function getCurrentUser(cookies: AstroCookies): User | null {
  const userId = cookies.get('userId')?.value;
  if (!userId) return null;

  const stmt = db.prepare('SELECT id, username, email FROM users WHERE id = ?');
  const user = stmt.get(userId) as User | undefined;
  return user || null;
}