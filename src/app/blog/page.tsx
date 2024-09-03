import Link from 'next/link';

type Props = {};

const fetchPosts = async (page: number = 1, search: string = '') => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(
    `${BASE_URL}/api/v1/web/blogs?page=${page}&limit=2&search=${search}`,
    { cache: 'no-store' } // Ensures fresh data on each request
  );
  const data = await response.json();

  return data.response;
};
const BlogPage = async (props: Props) => {
  const { data: posts, total, page, limit } = await fetchPosts();
  return (
    <div>
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
    </div>
  );
};
export default BlogPage;
