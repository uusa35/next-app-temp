export interface ProductAttribute {
  id: string;
  price: string;
  color_id: number;
  size_id: number;
  qty: number;
  color?: Object;
  size?: Object;
}

export interface Product {
  [key: string]: string;
  id: string;
  name_ar: string;
  name_en: string;
  image?: string;
  product_attributes?: [ProductAttribute];
  color?: Object;
  size?: Object;
  user?: Object;
  images?: Object;
  categories?: Object;
  description_ar?: string;
  description_en?: string;
}

export interface Products {
  data: [Product];
  links?: any;
  meta?: any;
}

export interface User {
  [key: string]: string;
  id: string;
  name: string;
  name_ar: string;
  name_en: string;
  image?: string;
  email: string;
  mobile?: string;
  description_ar?: string;
  description_en?: string;
}

export interface Users {
  data: User[];
  links?: Object;
  meta?: Object;
  user?: {
    element: User;
    categories?: Categories[];
    products?: Product[];
  };
}

export interface todo {
  id?: number | any;
  name?: string;
  isDone?: boolean;
}

export interface locale {
  lang: string;
  isRTL: boolean;
  dir: string;
  otherLang: string;
}

export interface Category {
  id: string | number;
  name_ar: string;
  name_en: string;
}

export interface Categories {
  data: [Category];
  links?: any;
  meta?: any;
}

export interface Setting {
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
}

export type MainContextType = {
  settings: Setting;
  trans: (name: string) => string;
  getLocalized: (name?: string) => string;
  getAsset: (name: string) => string;
  getThumb: (name: string) => string;
  getMedium: (name: string) => string;
  getLarge: (name: string) => string;
  getFileUrl: (name: string) => string;
  classNames: (classes: []) => void;
};

export type ItemList<T> = {
  data: T[];
  links?: {
    first: string;
    next: string;
  };
  meta?: {};
  isLoading?: boolean;
  categories?: Categories[] | [];
};
export type ProductList<T extends Product> = ItemList<T> & {
  selectedElement?: Product;
};

export interface User {
  id: number | string;
  name: string;
}

export type UserList<T extends User> = ItemList<T> & {
  selectedElement?: User;
};

export type hor = `left` | `right`;
export type ver = `top` | `bottom`;
export type position = {
  position: Exclude<`${hor}-${ver}`, 'left-left'> | 'center';
};
