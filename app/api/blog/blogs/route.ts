import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma'; // Prisma client

export async function GET() {
  try {
    // Fetch all posts with the author information (user)
    const posts = await prisma.post.findMany({
      include: {
        author: {  // Include the author (user) data
          select: {
            id: true,
            email: true,  // You can customize what author fields you want to return
          },
        },
      },
      orderBy: {
        createdAt: 'desc',  // Order by newest posts first
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
