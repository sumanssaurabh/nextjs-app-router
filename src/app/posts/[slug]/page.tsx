// /app/posts/[slug]/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';

// Define the props type
type Props = {
  params: { slug: string };
  searchParams: {};
};

// Function to fetch blog data
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

// Function to generate metadata dynamically based on the slug
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = params;

  const post = await fetchBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog does not exist.',
    };
  }

  return {
    title: post.title,
    description: post.body.slice(0, 150), // Provide a short description for SEO
  };
};

// Main page component to render blog details
const Page = async ({ params }: Props) => {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return (
      <div className='m-4'>
        <h2 className='py-4'>
          <Link href={`/`}>Home page</Link>
        </h2>
        <p>Blog not found.</p>
      </div>
    );
  }

  return (
    <div className='m-4'>
      <h2 className='py-4'>
        <Link href={`/`}>Home page</Link>
      </h2>
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p className='py-2' dangerouslySetInnerHTML={{ __html: post.body }}></p>
      </div>
    </div>
  );
};

export default Page;
