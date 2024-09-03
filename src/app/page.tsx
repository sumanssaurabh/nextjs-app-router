import Image from 'next/image';

import Link from 'next/link';

export default function Home() {
  return (
    <main className=' min-h-screen  p-24'>
      <h1>Hello</h1>
      <br />

      <Link href={`posts`}>Posts Page</Link>
    </main>
  );
}
