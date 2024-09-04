import { NextResponse, NextRequest } from 'next/server';

const fetchPosts = async (page: number = 1, search: string = '') => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(
    `${BASE_URL}/api/v1/web/blogs?page=${page}&limit=2&search=${search}`,
    { cache: 'no-store' } // Ensures fresh data on each request
  );
  const data = await response.json();

  return data.response;
};

export const GET = async (req: NextRequest) => {
  const host = req.headers.get('host') ?? '';
  const date = new Date();

  console.log(`${date.toISOString()} => host: ${host}`);

  try {
    const data = await fetchPosts();

    return NextResponse.json(data ?? {});
  } catch (error) {
    console.log('error', error);

    return NextResponse.json({ data: error, host });
  }
};
