// /app/posts/page.tsx

// import { getDictionary } from '@/app/[lng]/dictionaries';

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

// Function to fetch posts server-side
const fetchPosts = async (page: number = 1, search: string = '') => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(
    `${BASE_URL}/api/v1/web/blogs?page=${page}&limit=2&search=${search}`,
    { cache: 'no-store' } // Ensures fresh data on each request
  );
  const data = await response.json();

  return data.response;
};

const Page = async ({ searchParams, params: { lng } }: Props) => {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const searchQuery = searchParams.search || '';

  // const dict = await getDictionary(lng);

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
      <h2 className='py-4'>
        <Link href={`/`}>Home page</Link>
      </h2>

      {/* Search Form */}
      <form method='get'>
        <input
          type='text'
          name='search'
          placeholder='Search posts...'
          defaultValue={searchQuery}
          className='border p-2'
          autoComplete='off'
        />
        <button type='submit' className='ml-2 p-2 bg-blue-500 text-white'>
          Search
        </button>
      </form>

      {/* Posts List */}
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <div className='py-6' key={post.id}>
            <Link href={`posts/${post.slug}`}>{post.title}</Link>

            <br />
            <hr />
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}

      {/* Pagination */}
      <div className='pagination mt-4'>
        {Array.from({ length: total }, (_, index) => (
          <Link
            key={index + 1}
            href={`?page=${index + 1}&search=${searchQuery}`}
            className={`mr-2 px-4 py-2 ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
