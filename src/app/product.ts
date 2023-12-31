export interface Iproduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  total: number;
  rating: {
    rate: number;
    count: number;
  };
}
