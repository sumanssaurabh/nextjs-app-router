import { NextResponse, NextRequest } from 'next/server';

const fetchBlogPost = async (slug: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/api/v1/web/blogs/${slug}`, {
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the blog post');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    return null;
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const host = req.headers.get('host') ?? '';
  const date = new Date();

  console.log(params.slug);

  console.log(`${date.toISOString()} => host: ${host}`);

  try {
    const data = await fetchBlogPost(host);

    return NextResponse.json(data ?? {});
  } catch (error) {
    console.log('error', error);

    return NextResponse.json({ data: error, host });
  }
};
