'use client';

import { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { delay } from '@/util/helper';

const data = [
  {
    id: 1,
    name: 'Shopping',
    isMarked: true,
  },
  {
    id: 2,
    name: 'Movie',
    isMarked: false,
  },
];

const fetchTodos = async () => {
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // const response = await fetch(`${BASE_URL}/api/v1/todos`, {
  //   cache: 'no-store',
  // });

  await delay(2000);

  const response = await fetch(`/api/todos`, {
    cache: 'no-store',
  });

  try {
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('err');
  }
};

function Todo(): JSX.Element {
  const [state, setState] = useState(data);

  useEffect(() => {
    fetchTodos()
      .then((res) => {
        console.log(res);

        const tmp = res.map((e: { _id: any; cheked: any }) => ({
          ...e,
          id: e._id,
          isMarked: e.cheked,
        }));
        setState(tmp);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, []);

  const onAdd = (name: string) => {
    const newTodo = {
      id: state.length + 1,
      name,
      isMarked: false,
    };

    const data = [...state, newTodo];

    setState(data);
  };

  const onCompleted = (e: { target: { checked: any } }, id: number) => {
    const val = e.target.checked;

    const itemList = state.map((e) => {
      if (e.id === id) {
        const updateTodoTemp = {
          ...e,
          isMarked: val,
        };

        return updateTodoTemp;
      } else {
        return e;
      }
    });

    setState(itemList);
  };

  const onDelete = (id: number) => {
    const itemList = state.filter((e) => e.id !== id);

    setState(itemList);
  };

  return (
    <div>
      Todo
      <div className='todo-app'>
        <div className='header'>
          <h1>Simple TodoApp</h1>
        </div>

        <AddTodo onAdd={onAdd} />
        <TodoList data={state} onCompleted={onCompleted} onDelete={onDelete} />
      </div>
    </div>
  );
}
export default Todo;
