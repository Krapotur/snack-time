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
}

export interface Category {
  id: string;
  title: string;
  isActive: boolean;
}
