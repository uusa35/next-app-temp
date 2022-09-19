import '../styles/globals.css';
import { AppProps } from 'next/app';
import { MainLayout } from '../components/Layouts/MainLayout';
import { getSettings } from './api';
import { Setting } from '../types';
import { NextPageContext } from 'next/dist/shared/lib/utils';
import { Provider } from 'react-redux';
import { useStore } from './../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './../redux/store';

interface GlobalProps {
  pageProps: AppProps;
  initialReduxState: any;
}

function MyApp({
  Component,
  pageProps,
  settings,
}: {
  Component: any;
  pageProps: GlobalProps;
  settings: Setting;
}) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <MainLayout settings={settings}>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

MyApp.getInitialProps = async ({
  Component,
  ctx,
}: {
  Component: any;
  ctx: NextPageContext;
}) => {
  const settings = await getSettings();
  let pageProps: {} = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, settings };
};
