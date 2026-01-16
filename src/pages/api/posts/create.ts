import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import { getCurrentUser } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const user = getCurrentUser(cookies);
  
  if (!user) {
    return redirect('/login');
  }

  try {
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();

    if (!title || !content) {
      return redirect('/create-post');
    }

    db.prepare(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)'
    ).run(title, content, user.id);

    return redirect('/dashboard');
  } catch (error) {
    console.error('Create post error:', error);
    return redirect('/create-post');
  }
};