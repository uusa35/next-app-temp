/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { useAppSelector } from '../redux/hooks';
import { User, Users } from '../types';
import { NextPage } from 'next';
import { thumbUrl } from '../pages/api';
import { useContext } from 'react';
import { MainContext } from './Layouts/MainLayout';
import Link from 'next/link';
import Image from 'next/image';

const UsersList: NextPage = () => {
  const { users } = useAppSelector((state) => state);
  const { trans }: any = useContext(MainContext);
  return (
    <>
      <h2 className={`w-full m-4`}>{trans('users')}</h2>
      {users.data.length > 0 && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {users.data.map((p: User) => (
            <Link href={`user/${p.id}`} key={p.id}>
              <li
                key={p.email}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col p-8">
                  <Image
                    className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                    src={`${thumbUrl}${p.image}`}
                    alt=""
                    width={100}
                    height={100}
                    layout={`responsive`}
                  />
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">
                    {p.name_ar}
                  </h3>
                  <dl className="mt-1 flex-grow flex flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-gray-500 text-sm">
                      {p.description_ar}
                    </dd>
                    <dt className="sr-only">Role</dt>
                    <dd className="mt-3">
                      <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {p.name_en}
                      </span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <a
                        href={`mailto:${p.email}`}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <MailIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Email</span>
                      </a>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                      <a
                        href={`tel:${p.mobile}`}
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                      >
                        <PhoneIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-3">Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default UsersList;
