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
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();

    if (!postId || !title || !content) {
      return redirect('/dashboard');
    }

    db.prepare(
      'UPDATE posts SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?'
    ).run(title, content, postId, user.id);

    return redirect('/dashboard');
  } catch (error) {
    console.error('Update post error:', error);
    return redirect('/dashboard');
  }
};