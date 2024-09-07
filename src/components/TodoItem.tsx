function TodoItem({ todo, onCompleted, onDelete }) {
  if (todo.isMarked) {
    return (
      <div className='todo-item'>
        <input
          type='checkbox'
          className='mx-2'
          defaultChecked
          onChange={(e) => onCompleted(e, todo.id)}
        />
        <s>{todo.name}</s>{' '}
        <button className='btn btn-danger' onClick={() => onDelete(todo.id)}>
          X
        </button>
      </div>
    );
  } else {
    return (
      <div className='todo-item'>
        <input
          type='checkbox'
          className='mx-2'
          onChange={(e) => onCompleted(e, todo.id)}
        />
        <span>{todo.name}</span>{' '}
        <button className='btn btn-danger' onClick={() => onDelete(todo.id)}>
          X
        </button>
      </div>
    );
  }
}

export default TodoItem;
