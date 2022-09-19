import { GetServerSideProps, NextPage } from 'next';
import { User, Product, Category } from '../../types';
import { getUser, thumbUrl } from '../api';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Props {
  user: { element: User; products: Product[]; categories: Category[] };
}

const UserShow: NextPage<Props> = ({ user }) => {
  const { element, products, categories } = user;
  const router = useRouter();

  if (!element.id) {
    return <div>throw error here.</div>;
  }
  return (
    <div>
      <Head>
        <title>{element.name_ar}</title>
        <meta property="description" content={`${element.name_en}`} />
        <meta property="og:image" content={`${thumbUrl}${element.image}`} />
        <meta
          property="facebook:image"
          content={`${thumbUrl}${element.image}`}
        />
      </Head>
      <div>User {element.name_ar}</div>
      <div>User ID : {element.id}</div>
    </div>
  );
};

export default UserShow;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      user: await getUser(context.params.id),
    },
  };
};
