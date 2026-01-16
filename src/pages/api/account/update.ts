import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import { getCurrentUser, hashPassword } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const user = getCurrentUser(cookies);
  
  if (!user) {
    return redirect('/login');
  }

  try {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const email = formData.get('email')?.toString();
    const newPassword = formData.get('newPassword')?.toString();

    if (!username || !email) {
      return redirect('/account?error=invalid');
    }

    // Check if username/email is taken by another user
    const existingUser = db.prepare(
      'SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?'
    ).get(username, email, user.id);

    if (existingUser) {
      return redirect('/account?error=exists');
    }

    // Update username and email
    if (newPassword && newPassword.length >= 6) {
      const hashedPassword = await hashPassword(newPassword);
      db.prepare(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?'
      ).run(username, email, hashedPassword, user.id);
    } else {
      db.prepare(
        'UPDATE users SET username = ?, email = ? WHERE id = ?'
      ).run(username, email, user.id);
    }

    return redirect('/account?success=true');
  } catch (error) {
    console.error('Update account error:', error);
    return redirect('/account?error=invalid');
  }
};