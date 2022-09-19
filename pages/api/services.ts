import { NextApiRequest, NextApiResponse } from 'next';
import { axiosInstance, getProducts } from './index';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const products = await getProducts({});
  res.json(products);
}
