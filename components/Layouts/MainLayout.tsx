import React, { createContext, ReactNode, useEffect } from 'react';
import { MainContextType, Setting } from '../../types';
import MyHeader from './MyHeader';
import { imagesUrl, storageUrl } from '../../pages/api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { enableBootStrapped } from '../../redux/slices/bootStrappedSlice';
import MainNav from './MainNav';
import { useRouter } from 'next/router';

interface MainLayoutPropsType {
  children: ReactNode | undefined;
  settings: Setting;
}

const initialContext: MainContextType = {
  settings: {
    name_ar: '',
    name_en: '',
  },
  trans: () => '',
  getLocalized: () => '',
  getAsset: () => '',
  getThumb: () => '',
  getMedium: () => '',
  getLarge: () => '',
  getFileUrl: () => '',
  classNames: () => '',
};
const MainContext = createContext<MainContextType>(initialContext);

const MainLayout = ({ children, settings }: MainLayoutPropsType) => {
  const { locale, translations, bootStrapped } = useAppSelector(
    (state) => state
  );
  const dispatch = useAppDispatch();
  const { pathname, asPath } = useRouter();

  useEffect(() => {
    // console.log('path name change', asPath);
    // google analatics here
  }, [pathname]);

  const context: MainContextType = {
    settings,
    trans: (name: string) =>
      translations[name] ? translations[name][locale.lang] : name,
    classNames: (...classes: any) => classes.filter(Boolean).join(' '),
    getLocalized: (element: string = 'name') =>
      locale.lang === 'ar' ? `${element}_ar` : `${element}_en`,
    getAsset: (element: string, type = 'png') =>
      `${storageUrl}/${element}.${type}`,
    getThumb: (element: string) => `${imagesUrl}thumbnail/${element}`,
    getMedium: (element: string) => `${imagesUrl}medium/${element}`,
    getLarge: (element: string) => `${imagesUrl}large/${element}`,
    getFileUrl: (element: string) => `${storageUrl}files/${element}`,
  };

  useEffect(() => {
    if (!bootStrapped) {
      return dispatch(enableBootStrapped());
    }
  }, [bootStrapped]);

  return (
    <MainContext.Provider value={context}>
      <MyHeader />
      <div className="min-h-screen" dir={locale.isRTL ? 'rtl' : 'ltr'}>
        <MainNav />
        <main className="min-h-screen flex w-full flex-1 flex-col items-center justify-center px-20 text-center border-2 border-black">
          {children}
        </main>
      </div>
    </MainContext.Provider>
  );
};

export { MainContext, MainLayout };
