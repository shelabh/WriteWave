import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const cookieStore =  cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { session } } = await supabase.auth.getSession();

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Extract userId from the session
    const authorId = session.user.id;

    // Extract title and content from the request body
    const { title, content } = await request.json();

    // Validate the input (ensuring both title and content are provided)
    if (!title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new post using Prisma with the authorId from the session
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    // Return the created post in the response
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}