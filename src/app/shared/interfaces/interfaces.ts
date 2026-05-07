export interface Restaurant {
  _id?: string,
  position?: number,
  status?: boolean,
  title: string,
  description: string,
  timeOpen: string,
  timeClose: string,
  imgSrc?: string,
  rating?: number,
  kitchen: string,
  typePlace: string
}

export interface Kitchen {
  _id: string,
  position?: number,
  status?: boolean,
  title: string,
  imgSrc?: string
}

export interface Category{
  _id: string,
  isDrink: boolean,
  position?: number,
  status?: boolean,
  title: string,
  quantity?: number,
  imgSrc: string
}

export interface Position {
  _id?: string,
  positionNum?: number,
  status?: boolean,
  isDrink: boolean,
  isPopular: boolean,
  discount: number,
  title: string,
  imgSrc: string,
  price: number,
  composition: string,
  weight: number,
  proteins: number,
  fats: number,
  carbs: number,
  caloric: number,
  category: string
  restaurant: string
}

export interface Dish {
  id: string;
  title: string;
  isActive: boolean;
  weight: string;
  price: number;
  imgSrc: string;
  category: string;
  discount: number;
  quantityInCart: number;
  description: string;
}
