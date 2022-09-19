import axios from 'axios';
import { Product, Products, Setting, Users, User } from '../../types';

export const baseUrl = `http://ecommerce-backend.test/`;
export const apiUrl = `${baseUrl}api/`;
export const imagesUrl = `${baseUrl}storage/uploads/images/`;
export const thumbUrl = `${baseUrl}storage/uploads/images/thumbnail/`;
export const largeUrl = `${baseUrl}storage/uploads/images/large/`;
export const storageUrl = `${baseUrl}storage/uploads/`;
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  // withCredentials : true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_SECRET_API_KEY,
  },
});
axiosInstance.defaults.headers.common = {
  'x-api-key': process.env.NEXT_PUBLIC_SECRET_API_KEY,
};

export const getProducts = async (params?: Object): Promise<Products> => {
  return await axiosInstance
    .get(`search/product?`, { params })
    .then((r) => r.data)
    .catch((e) => console.log(e));
};

export const getProduct = async (params?: { id: string }): Promise<Product> => {
  const { id } = params!;
  return await axiosInstance
    .get(`product/${id}`, { params })
    .then((r) => r.data)
    .catch((e) => e.response.data.message);
};

export const getSettings = async (): Promise<Setting> =>
  await axiosInstance
    .get(`setting`)
    .then((r) => r.data)
    .catch((e) => console.log(e));

export const getTrans = async () =>
  await axiosInstance
    .get(`translations`)
    .then((r) => r.data)
    .catch((e) => console.log(e));

export const getUsers = async (params: Object): Promise<Users> => {
  return await axiosInstance
    .get(`search/user?`, { params })
    .then((r) => r.data)
    .catch((e) => console.log(e));
};

export const getUser = async (id: string | number): Promise<User> => {
  return await axiosInstance
    .get(`user/${id}`)
    .then((r) => r.data)
    .catch((e) => console.log(e));
};

export const changeLang = async (lang: string): Promise<User> => {
  return await axiosInstance
    .get(`lang/${lang}`)
    .then((r) => r.data)
    .catch((e) => console.log(e));
};

export const getAuthenticatedUser = async (): Promise<User> => {
  const api_token = `519982926`;
  return await axiosInstance
    .post(
      `user`,
      {
        bodyParameters: { api_token },
      },
      {
        headers: {
          common: { Authorization: `Bearer ${api_token}` },
        },
      }
    )
    .then((r) => r.data)
    .catch((e) => console.log('e auth', e));
};
