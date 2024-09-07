import { NextResponse } from 'next/server';

const fetchTodos = async () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const response = await fetch(`${BASE_URL}/api/v1/todos`, {
    cache: 'no-store',
  });

  try {
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('err');
  }
};

export const GET = async () => {
  try {
    const data = await fetchTodos();

    return NextResponse.json(data ?? {});
  } catch (error) {
    console.log('error', error);

    return NextResponse.json({ data: error });
  }
};
