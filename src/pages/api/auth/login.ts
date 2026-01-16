import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import { verifyPassword, setAuthCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      return redirect('/login?error=invalid');
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (!user) {
      return redirect('/login?error=invalid');
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return redirect('/login?error=invalid');
    }

    setAuthCookie(cookies, user.id);

    return redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return redirect('/login?error=invalid');
  }
};