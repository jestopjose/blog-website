import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import { hashPassword, setAuthCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!username || !email || !password) {
      return redirect('/signup?error=invalid');
    }

    // Check if user exists
    const existingUser = db.prepare(
      'SELECT id FROM users WHERE username = ? OR email = ?'
    ).get(username, email);

    if (existingUser) {
      return redirect('/signup?error=exists');
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const result = db.prepare(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    ).run(username, email, hashedPassword);

    // Set auth cookie
    setAuthCookie(cookies, Number(result.lastInsertRowid));

    return redirect('/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
    return redirect('/signup?error=invalid');
  }
};