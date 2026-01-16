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
    const postId = formData.get('postId')?.toString();

    if (!postId) {
      return redirect('/dashboard');
    }

    db.prepare('DELETE FROM posts WHERE id = ? AND user_id = ?').run(postId, user.id);

    return redirect('/dashboard');
  } catch (error) {
    console.error('Delete post error:', error);
    return redirect('/dashboard');
  }
};