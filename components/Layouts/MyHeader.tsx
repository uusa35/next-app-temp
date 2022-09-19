import Head from 'next/head';
import React, { useContext } from 'react';
import { MainContext } from './MainLayout';
import { MainContextType } from '../../types';

const MyHeader = () => {
  const { settings, getLocalized, getThumb }: any =
    useContext<MainContextType>(MainContext);
  return (
    <Head>
      <title>{settings[getLocalized()]}</title>
      <meta
        property="description"
        content={`${settings[getLocalized('description')]}`}
      />
      <meta property="og:image" content={`${getThumb(settings.image)}`} />
      <meta property="facebook:image" content={`${getThumb(settings.image)}`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default MyHeader;
