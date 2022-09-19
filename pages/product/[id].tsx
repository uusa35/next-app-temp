import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Product } from '../../types';
import { getProduct, getProducts } from '../api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React from 'react';

interface Props {
  element: Product;
}

const ProductShow: NextPage<Props> = ({ element }) => {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!element.id) {
    return <div>throw error here.</div>;
  }
  return (
    <div className={`h-60 border-2`}>
      <div className="relative h-40 w-auto border-2 border-pink-900">
        <Image
          loader={() => element.thumb}
          src={`${element.thumb}`}
          // width={100}
          // height={120}
          layout={`fill`}
          objectFit={`contain`}
        />
      </div>
      <div>Product {element.name_ar}</div>
      <div>Product ID : {element.id}</div>
    </div>
  );
};

export default ProductShow;

export const getStaticPaths: GetStaticPaths = async () => {
  const preData = await getProducts();
  const paths: any = preData.data.map((p: Product) => ({
    params: { id: p.id.toString(), slug: [p.name_ar] },
  }));
  return {
    paths,
    fallback: 'blocking', // generated when requested
    // fallback: true, //
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const element = await getProduct(params);
  if (!element.id) {
    return { notFound: true };
  }
  return {
    props: {
      element,
      fallback: true,
    },
    revalidate: 10,
  };
};
