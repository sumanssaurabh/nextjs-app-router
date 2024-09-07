import { getDictionary } from './dictionaries';

import Link from 'next/link';

type Props = {
  params: { lng: string };
};

export default async function Home({ params: { lng } }: Props) {
  const dict = await getDictionary(lng);

  return (
    <main className='min-h-screen p-24 flex flex-col items-center justify-center bg-gray-50'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800'>{dict.home}</h1>
      <div className='space-y-4'>
        <Link href='/login' className='text-lg text-blue-500 hover:underline'>
          Login
        </Link>
        <br />
        <Link href='/posts' className='text-lg text-blue-500 hover:underline'>
          Posts Page
        </Link>
      </div>
    </main>
  );
}
