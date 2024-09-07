import Link from 'next/link';
import { ReactNode } from 'react';

export type ChildrenType = {
  children: ReactNode;
};

const NavBar = () => {
  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-around'>
        <Link href='/posts' className='text-white hover:text-gray-300'>
          Posts
        </Link>
      </div>
    </nav>
  );
};

const BlankLayout = ({ children }: ChildrenType) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar />
      <main className='flex-grow container mx-auto p-6'>{children}</main>
    </div>
  );
};

const Layout = ({ children }: ChildrenType) => {
  return <BlankLayout>{children}</BlankLayout>;
};

export default Layout;
