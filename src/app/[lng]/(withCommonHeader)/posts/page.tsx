// /app/posts/page.tsx

import { getDictionary } from '@/app/[lng]/dictionaries';
import { delay } from '@/util/helper';

import { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: { lng: string };
  searchParams: {
    page?: string;
    search?: string;
  };
};

export const metadata: Metadata = {
  title: 'Posts',
  description:
    'Blog posts listing page with pagination and search functionality.',
};

const fetchPosts = async (page: number = 1, search: string = '') => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  delay(2000);

  const response = await fetch(
    `${BASE_URL}/api/v1/posts?page=${page}&limit=2&search=${search}`,
    { cache: 'no-store' }
  );

  try {
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('err');
  }
};

const Page = async ({ searchParams, params: { lng } }: Props) => {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchQuery = searchParams.search || '';

  const dict = await getDictionary(lng);

  // Fetch posts server-side
  const {
    data: posts,
    total,
    page,
    limit,
  } = await fetchPosts(currentPage, searchQuery);

  // console.log('api', { posts, total, page, limit });

  return (
    <div className='m-4'>
      <h2 className='py-4 text-2xl font-semibold'>
        <Link href='/'>{dict.home}</Link>
      </h2>

      {/* Search Form */}
      <form method='get' className='mb-6'>
        <input
          type='text'
          name='search'
          placeholder='Search posts...'
          defaultValue={searchQuery}
          className='border p-2 rounded-md w-full sm:w-auto'
          autoComplete='off'
        />
        <button
          type='submit'
          className='ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
        >
          Search
        </button>
      </form>

      {posts.length > 0 ? (
        posts.map((post: any) => (
          <div className='py-6 border-b' key={post._id}>
            <Link
              href={`posts/${post._id}`}
              className='text-xl font-medium text-blue-500 hover:underline'
            >
              {post.title}
            </Link>
          </div>
        ))
      ) : (
        <p className='text-gray-600'>No posts found.</p>
      )}

      <div className='pagination mt-6 flex justify-center'>
        {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
          <Link
            key={index + 1}
            href={`?page=${index + 1}&search=${searchQuery}`}
            className={`mr-2 px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-gray-300`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
