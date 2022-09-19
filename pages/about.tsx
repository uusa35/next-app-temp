import { useContext } from 'react';
import { MainContext } from '../components/Layouts/MainLayout';
import { GetStaticProps, NextPage } from 'next';
import { MainContextType } from '../types';

const About: NextPage = () => {
  const { settings, getLocalized, trans } =
    useContext<MainContextType>(MainContext);
  return (
    <div>
      <h1>{trans('aboutus')}</h1>
      <p>
        {trans('name')} : {settings[getLocalized()]}
      </p>
      <p>
        {trans('description')} : {settings[getLocalized('description')]}
      </p>
    </div>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
