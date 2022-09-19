import React, { ContextType, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { getProducts, thumbUrl } from '../api';
import Image from 'next/image';
import Link from 'next/link';
import { MainContextType, Product, Products } from '../../types';
import { MainContext } from '../../components/Layouts/MainLayout';

interface Props {
  elements: Products;
}

const ProductIndex: NextPage<Props> = ({ elements }) => {
  const { getLocalized } = useContext<MainContextType>(MainContext);
  return (
    <div>
      <div className={`text-2xl text-pink-900`}>Product List</div>
      <ul>
        {elements.data.map((p: Product) => (
          <Link href={`product/${p.id}`} key={p.id}>
            <li
              className={`flex flex-row border-2 items-center justify-start mb-2`}
            >
              <h3 className={`mx-4 w-28 overflow-hidden`}>
                {p[getLocalized()]}
              </h3>
              <Image
                src={`${p.thumb}`}
                width={100}
                height={120}
                layout={`fixed`}
              />
            </li>
          </Link>
        ))}
      </ul>
      <div className={`space-x-2`}>
        {elements.links.first && <Link href={elements.links.first}>First</Link>}
        {elements.links.next && <Link href={elements.links.next}>Next</Link>}
      </div>
    </div>
  );
};

export default ProductIndex;
// getServerSide will render only in a page (Not Component)
// getStaticPaths + getStatProps can be rendered inside a component and a page
export const getStaticProps: GetServerSideProps = async (context) => {
  return {
    props: {
      elements: await getProducts(context.query),
    },
  };
};
