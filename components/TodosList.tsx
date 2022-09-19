import React from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  removeToDo,
  todosSlice,
  toggleComplete,
} from '../redux/slices/todosSlice';

const TodosList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, users } = useAppSelector((state) => state);

  return (
    <div>
      <h1>List of Todos</h1>
      {todos && (
        <ul>
          {todos.map((t) => (
            <li
              key={t.name}
              style={{
                display: 'flex',
                backgroundColor: `${t.isDone ? 'green' : 'red'}`,
                width: '90%',
                margin: 'auto',
                borderWidth: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h1>{t.name}</h1>
              <button onClick={() => dispatch(removeToDo(t.id))}>
                <AiFillDelete /> delete X
              </button>
              <button>
                <AiFillEdit /> edit
              </button>
              <button onClick={() => dispatch(toggleComplete(t.id))}>
                <AiOutlineCheckCircle /> mark
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodosList;
