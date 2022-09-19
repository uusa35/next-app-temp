import type { NextPage } from 'next';
import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../components/Layouts/MainLayout';
import InputField from '../components/InputField';
import TodosList from '../components/TodosList';
import { addToDo } from '../redux/slices/todosSlice';
import { disableBootStrapped } from '../redux/slices/bootStrappedSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getUsers, getUser, selectedUsers } from '../redux/slices/usersSlice';
import UsersList from '../components/UsersList';
import { MainContextType } from '../types';
import { GetServerSideProps } from 'next';
import { useGetAllQuery } from '../redux/api/productApi';

const Home: NextPage = () => {
  const { settings, trans } = useContext<MainContextType>(MainContext);
  const { data, error, isLoading } = useGetAllQuery(null);
  const [todo, setToDo] = useState<string>('');
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectedUsers);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch(addToDo(todo));
      setToDo('');
    }
  };

  useEffect(() => {}, []);
  console.log('the data from productAPI', data);

  return (
    <div>
      <h1>HomePage</h1>
      <h1>{trans('name')}</h1>
      <h1>{settings.name_ar}</h1>
      <h1>Enter Your Todo Item</h1>
      <InputField todo={todo} setToDo={setToDo} handleSubmit={handleSubmit} />
      <div className={`flex flex-row space-x-2`}>
        <button
          onClick={() => dispatch(getUsers({ is_author: 1 }))}
          className={`p-3 border bg-green-200 rounded-md`}
        >
          {' '}
          get authors
        </button>
        <button
          onClick={() => dispatch(getUsers({ is_company: 1 }))}
          className={`p-3 border bg-blue-200 rounded-md`}
        >
          {' '}
          get companies
        </button>
        <button
          onClick={() => dispatch(getUser(Math.floor(Math.random() * 10) + 1))}
          className={`p-3 border bg-pink-200 rounded-md`}
        >
          {' '}
          get getUser
        </button>
        <button onClick={() => dispatch(disableBootStrapped())} role={`reset`}>
          RESET
        </button>
      </div>
      <TodosList />
      {users.data && <UsersList />}
      {users && users.user && users.user.element && (
        <>
          <h1>the user</h1>
          <h1>id : {users.user.element.id}</h1>
          <h1>Name Arabic : {users.user.element.name_ar}</h1>
          <h1>Name English : {users.user.element.name_en}</h1>
          <p className={`px-10 overflow-hidden`}>
            {/*{JSON.stringify(users.user.element)}*/}
          </p>
        </>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};
