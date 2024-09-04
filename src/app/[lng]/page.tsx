import Image from 'next/image';

import Link from 'next/link';

type Props = {
  params: { lng: string };
};

export default async function Home({ params: { lng } }: Props) {
  return (
    <main className=' min-h-screen  p-24'>
      <h1>Hello</h1>
      <br />

      <Link href={`posts`}>Posts Page</Link>
    </main>
  );
}
