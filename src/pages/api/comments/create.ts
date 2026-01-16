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
    const content = formData.get('content')?.toString();

    if (!postId || !content) {
      return redirect('/');
    }

    db.prepare(
      'INSERT INTO comments (content, post_id, user_id) VALUES (?, ?, ?)'
    ).run(content, postId, user.id);

    return redirect(`/post/${postId}`);
  } catch (error) {
    console.error('Create comment error:', error);
    return redirect('/');
  }
};